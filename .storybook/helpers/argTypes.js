import stencilDocs from '../../stencilDocs.json';
import { spread } from '@open-wc/lit-helpers';
import { camelKeysToKebab } from './utils';
import camelCase from 'lodash/camelCase';

export function getComponentData(componentName) {
  return stencilDocs.components.find(n => n.tag === componentName);
}

const getPropType = (prop) =>
  prop.type.indexOf('|') > -1 ? 'enum' : prop.type;

const cleanStrValue = (value) =>
  value.replace(/^\s*["|']*/,'').replace(/["|']*\s*$/,'');

function getDefaultValue(prop) {
  const type = prop.type.name;
  const def = prop.table.defaultValue.summary;
  return type === 'boolean'
    ? def.toLowerCase() === 'true'
    : type === 'number'
      ? parseInt(def, 10)
      : cleanStrValue(def);
}

function filterPaddingProps(argTypes) {
  const descript = '**Padding** *(accepts shorthands, eg. `p="sm xl lg"`)*.<br/><br/>Also supports **side variants**: **`px`**,  **`py`**, **`pt`**, **`pr`**, **`pb`**, **`pl`** where \'p\' stands for padding and second char for side (t = top, l = left, x= left & right, …)<br/>*(eg. `px="sm" pt="lg"`)*';
  const paddingProps = ['p', 'px', 'py', 'pt', 'pr', 'pb', 'pl'];

  Object.keys({ ...argTypes }).forEach(prop => {
    if (!paddingProps.includes(prop)) return;
    if (prop === 'p') {
      argTypes[prop].description = descript;
    } else {
      delete argTypes[prop];
    }
  });
}

export function getArgTypes(compData) {
  const propsArr = compData.props;
  const argTypes = {};
  for (let i = 0; i < propsArr.length; i++) {
    const prop = propsArr[i];
    const tip = getPropType(prop);

    // TODO: STORYBOOK BUG
    //   If you clear field exception occures:
    //   Warning: `value` prop on `input` should not be null
    //   Workaround: Change number type to string
    const storybookType = ['enum', 'number'].includes(tip) ? 'string' : tip;

    argTypes[prop.name] = {
      description: prop.docs,
      type: {
        name: storybookType,
        required: prop.required },
      table: {
        type: { summary: prop.type },
        defaultValue: { summary: prop.default },
      },
    };
    if (tip === 'enum') {
      argTypes[prop.name].control = {
        type: 'select',
        options: prop.type.split('|').map(n => cleanStrValue(n))
      };
    }
    argTypes[prop.name].defaultValue = getDefaultValue(argTypes[prop.name]);
  }
  filterPaddingProps(argTypes);
  return argTypes;
}

export function getDefaultArgs(argTypes) {
  const args = {};
  for (const key in argTypes) {
    if (!argTypes.hasOwnProperty(key)) continue;
    args[key] = getDefaultValue(argTypes[key]);
  }
  return args;
}

export function getArgTypesAndArgs(componentName) {
  const compData = getComponentData(componentName);
  const argTypes = getArgTypes(compData);
  return {
    argTypes,
    args: getDefaultArgs(argTypes),
  }
}

export function spreadArgs(args, argTypes) {
  const isTrueByDefault = (prop) => {
    return argTypes[camelCase(prop)] && argTypes[camelCase(prop)].defaultValue === true;
  }

  if (!argTypes) throw('argTypes.js: spreadArgs missing argTypes param');
  const attrs = camelKeysToKebab(args);
  for (const key in attrs) {
    if (!attrs.hasOwnProperty(key)) continue;
    attrs[key] = attrs[key] === false && !isTrueByDefault(key) ? null : attrs[key];
  }
  return spread(attrs);
}
