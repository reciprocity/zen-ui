import * as path from 'path';
import { updateFile, prefixPaths } from './utils';

/**
 * ==================================
 * Script configuration
 * ==================================
 */
const CONFIG = {
  /**
   * The path where Stencil puts all the generated files. It's only used when preparing the
   * configuration that will be used by the functions, as a "prefix" for the values of the `paths`
   * dictionary.
   */
  targetPath: 'src/output',
  /**
   * A dictionary of paths for the files the script needs to update.
   */
  paths: {
    /**
     * The package "entry point", where all the wrappers are created. The script will add the
     * export for the function that transforms the tag names (for the prefixes) and will modify
     * all the wrappers creation in order to send the reference of object that contains the
     * function.
     */
    loader: 'components.ts',
    /**
     * The file with the function that creates the wrappers. The script will modify the function
     * in order to add the parameter for the object that contains the transformer for the tags.
     */
    creator: 'react-component-lib/createComponent.tsx',
    /**
     * The file with the type definitions used by the generated code. The script will add the
     * type for the function used to transform tags names, and the interface that has the
     * function as a property.
     */
    types: 'react-component-lib/interfaces.ts',
  },
  /**
   * A dictionary with the names of types and/or interfaces the script needs to define on the
   * generated files.
   */
  types: {
    /**
     * The function the implementation can overwrite in order to modify the tag names.
     */
    fn: 'TransformTagFn',
    /**
     * The interface that has the transformer function as a property. This type exists because all
     * the wrappers are defined from the get go, but the components are created when used, so the
     * package sends a reference for an object of this type to the wrapper creation and exports
     * a function to overwrite the transformer on the object.
     */
    config: 'LibConfig',
  },
  /**
   * A dictionary with the different variables the script adds.
   */
  variables: {
    /**
     * The object that contains the transformer function and which reference will be sent to all
     * the wrappers.
     */
    constant: 'CONFIG',
    /**
     * The name of the parameter added to the function that creates the wrappers. It's value is
     * the reference of the object with the transformer function.
     */
    parameter: 'config',
    /**
     * The name of the function that can be used to transform tag names.
     */
    fn: 'transformTagName',
    /**
     * The name of the function the package will export in order for the implementation to add
     * its function to modify the tag names.
     */
    fnExport: 'setTagTransform',
  },
};

type Config = typeof CONFIG;

/**
 * ==================================
 * Helpers
 * ==================================
 */

// Generates a types import statement line.
const getTypesImportLine = (filepath: string, fromFilepath: string, types: string[]) => {
  let typesPath = path.relative(path.dirname(fromFilepath), filepath);
  if (typesPath.match(/^\w/)) {
    typesPath = `./${typesPath}`;
  }

  typesPath = typesPath.replace(/\.\w+$/, '');

  return `import type { ${types.join(', ')} } from '${typesPath}';`;
};

// Generates a configuration by updating its paths and prefixing them with the cwd.
const prepareConfig = (config: Config): Config => {
  const base = path.join(__dirname, config.targetPath);
  return {
    ...config,
    paths: prefixPaths(base, config.paths),
  };
};

/**
 * ==================================
 * Main functions
 * ==================================
 */

// Adds the types/interfaces needed for the modifications.
const addTypes = ({ paths, types, variables }: Config) =>
  updateFile(paths.types, async contents => {
    const lines = [
      `export type ${types.fn} = (tagName:string) => string;`,
      `export interface ${types.config} { ${variables.fn}: ${types.fn}; };`,
    ].join('\n');

    return `${contents}\n${lines}\n`;
  });

// Adds the export function and modify the wrappers creations.
const updateLoader = ({ paths, types, variables }: Config) =>
  updateFile(paths.loader, async contents => {
    const typesImportLine = getTypesImportLine(paths.types, paths.loader, Object.values(types));
    const lines = [
      `const ${variables.constant}: ${types.config} = {`,
      `  ${variables.fn}: (tagName) => tagName,`,
      '};',
      `export const ${variables.fnExport} = (fn: ${types.fn}) => {`,
      `  ${variables.constant}.${variables.fn} = fn;`,
      '};',
    ].join('\n');

    return contents
      .replace(/^(import (?:type )?\{.*?)$/m, `${typesImportLine}\n$1`)
      .replace(/^(export const )/m, `${lines}\n\n$1`)
      .replace(/(createReactComponent(?:<.*?>)?\()'/g, `$1${variables.constant}, '`);
  });

// Updates the wrapper creation in order to add and use the transform function.
const updateComponentsCreator = ({ paths, types, variables }: Config) =>
  updateFile(paths.creator, async contents => {
    const typesImportLine = getTypesImportLine(paths.types, paths.creator, [types.config]);
    return contents
      .replace(/^(import (?:type )?\{.*?)$/m, `${typesImportLine}\n$1`)
      .replace(/^(\s*)(tagName: string,)$/m, `$1${variables.parameter}: ${types.config},\n$1$2`)
      .replace(/(React\.createElement\()tagName,/, `$1${variables.parameter}.${variables.fn}(tagName),`);
  });

/**
 * ==================================
 * Runtime
 * ==================================
 */
(async () => {
  const beforeTime = new Date().getTime();
  const config = prepareConfig(CONFIG);
  await Promise.all([addTypes(config), updateLoader(config), updateComponentsCreator(config)]);
  const totalTime = new Date().getTime() - beforeTime;
  console.log(`\x1b[32m🚀  React bindings successfully updated \x1b[90min ${totalTime}ms\x1b[0m`);
})();
