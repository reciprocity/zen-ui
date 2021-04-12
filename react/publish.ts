import { execSync } from 'child_process';
import { prefixPaths, updateFile } from './utils';
import { name as mainPkgName, version as mainPkgVersion } from '../package.json';

/**
 * ==================================
 * Script configuration
 * ==================================
 */

/**
 * The scope used on the main package, needed for the `.npmrc` configurations.
 */
const mainPkgScope = mainPkgName.split('/').shift();
const CONFIG = {
  /**
   * The directory where all the commands will be executed.
   */
  cwd: __dirname,
  /**
   * A dictionary with the known paths the script needs to work with.
   */
  paths: {
    /**
     * The path where the main package is, relative to the working directory.
     * Before building the React package, the main package needs to be installed, and since this
     * is going to be executed just after the main package is published, there's no need to install
     * it from the registry, it's already built, so we can install it from the relative path.
     */
    basePackage: '..',
    /**
     * The path to the package.json. The reason this is on the config, instead of hardcoding it,
     * it's because of the advantage of the method that prepares the config: it prefixes all the
     * paths with the cwd and you can use them without worrying about the location and whether
     * or not `./` was added.
     */
    packageJson: 'package.json',
    /**
     * Just like the `packageJson`, this is the path of the `.npmrc` that will be updated before
     * publishing, and it's here so it can be prefixed with the cwd.
     */
    npmrc: '.npmrc',
  },
  /**
   * The list of registries where the package should be published. This is tricky, because these
   * names match with the ones configured for `@amanda-mitchell/semantic-release-npm-multiple`,
   * so env vars with their info should be available in order to be used.
   */
  registries: ['public', 'github'],
};

type Config = typeof CONFIG;

/**
 * ==================================
 * Helpers
 * ==================================
 */

// Runs a command on the cwd.
const run = (config: Config, cmd: string, inheritStdio: boolean = true): string =>
  execSync(`cd ${config.cwd} && ${cmd}`, { stdio: inheritStdio ? 'inherit' : 'ignore' })
    .toString()
    .trim();

type RegistryVariables = {
  registry: string;
  token: string;
};

// Gets the name of the variables for a specific registry.
const getRegistryVarNames = (name: string): RegistryVariables => {
  const useName = name.toUpperCase();
  return {
    registry: `${useName}_NPM_CONFIG_REGISTRY`,
    token: `${useName}_NPM_TOKEN`,
  };
};

// Validates that the env vars for all the registries are defined...or throws an error.
const validateRegistries = (names: string[]): void => {
  names.forEach(name => {
    const vars = getRegistryVarNames(name);
    const missing = Object.keys(vars).find(varName => !process.env[varName]);
    if (missing) {
      console.log(`\x1b[31m💥  Missing '${vars[missing]}' environment variable\x1b[0m`);
      process.exit(1);
    }
  });
};

type RegistryInfo = {
  url: string;
  npmrc: string;
};

// Gets the config and the url of a registry by its name.
const getRegistry = (name: string): RegistryInfo => {
  const vars = getRegistryVarNames(name);
  const url = process.env[vars.registry].replace(/\/+$/, '');
  const urlProtocolLess = url.replace(/^https?:/, '');
  const npmrc = [
    `${mainPkgScope}:registry=${url}`,
    `${urlProtocolLess}:_authToken=\${${vars.token}}`,
    '', // extra line.
  ].join('\n');

  return {
    url,
    npmrc,
  };
};

// Updates the `.npmrc` with a specific registry information.
const configureRegistry = ({ paths }: Config, registry: RegistryInfo | null = null) =>
  updateFile(paths.npmrc, async () => (registry ? registry.npmrc : ''));

// Validates the latest commit message to ensure whether or not to publish the package.
const shouldPublish = (config: Config): boolean =>
  !!/chore\(release\):\s*([\d\.]+)\s*/.exec(run(config, 'git log -1 --oneline', false));

type PackageJson = {
  name: string;
  version: string;
  dependencies: {
    [key: string]: string;
  };
  devDependencies: {
    [key: string]: string;
  };
};
type UpdatePackageJsonCb = (contents: PackageJson) => Promise<PackageJson>;

// Short-hand function to update the cwd's `package.json` properties
const updatePackageJson = ({ paths }: Config, fn: UpdatePackageJsonCb) =>
  updateFile(paths.packageJson, async contents => {
    const parsed = JSON.parse(contents) as PackageJson;
    const updated = await fn(parsed);
    return JSON.stringify(updated, null, 2);
  });

/**
 * ==================================
 * Main functions
 * ==================================
 */

// Updates the `package.json` version and install the dependencies.
const updateAndInstallDeps = async (config: Config) => {
  await updatePackageJson(config, async contents => {
    contents.version = mainPkgVersion;
    contents.dependencies[mainPkgName] = config.paths.basePackage;
    return contents;
  });

  run(config, 'rm -rf node_modules && yarn --frozen-lockfile');
  await updatePackageJson(config, async contents => {
    contents.dependencies[mainPkgName] = `^${mainPkgVersion}`;
    return contents;
  });
};

// Builds the package for cjs && esm.
const buildPackage = async (config: Config) => run(config, 'yarn build');

// Publishes the package on all the specified registries.
const publishPackage = async (config: Config) => {
  await config.registries.reduce(
    (acc, name) =>
      acc.then(async () => {
        const registry = getRegistry(name);
        await configureRegistry(config, registry);
        run(config, `npm publish --registry ${registry.url}`);
      }),
    Promise.resolve(),
  );

  await configureRegistry(config); // reset the .npmrc
};

// Generates a configuration by updating its paths and prefixing them with the cwd.
const prepareConfig = (config: Config): Config => ({
  ...config,
  paths: prefixPaths(config.cwd, config.paths),
});

/**
 * ==================================
 * Runtime
 * ==================================
 */
(async () => {
  const beforeTime = new Date().getTime();
  const config = prepareConfig(CONFIG);
  validateRegistries(config.registries);
  if (!shouldPublish(config)) {
    process.exit(0);
  }

  await updateAndInstallDeps(config);
  await buildPackage(config);
  await publishPackage(config);
  const totalTime = new Date().getTime() - beforeTime;
  console.log(`\x1b[32m🚀  React bindings successfully published \x1b[90min ${totalTime}ms\x1b[0m`);
})();
