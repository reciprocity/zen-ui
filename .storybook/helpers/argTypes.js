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
  const description = '**Inner padding** *(accepts shorthands, eg. `padding="sm xl lg"`)*.<br/>Also supports **side variants**: **`padding-top`**, **`padding-right`**, **`padding-bottom`**, **`padding-left`**<br/>*(eg. `padding-left="sm" padding-top="lg"`)*';

  const paddingProps = ['padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'];

  Object.keys({ ...argTypes }).forEach(prop => {
    if (!paddingProps.includes(prop)) return;
    if (prop === 'padding') {
      argTypes[prop].description = description;
    } else {
      delete argTypes[prop];
    }
  });
}

function filterMarginProps(argTypes) {
  const description = '**Outer margin** *(accepts shorthands, eg. `margin="sm xl lg"`)*.<br/>Also supports **side variants**: **`margin-top`**, **`margin-right`**, **`margin-bottom`**, **`margin-left`**<br/>*(eg. `margin-left="sm" margin-top="lg"`)*';

  const marginProps = ['margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft'];

  Object.keys({ ...argTypes }).forEach(prop => {
    if (!marginProps.includes(prop)) return;
    if (prop === 'margin') {
      argTypes[prop].description = description;
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
    const isReadonly = prop.name.startsWith('$');
    const description = isReadonly
      ? `<div class="readonly-prop">${prop.docs}</div>`
      : prop.docs;

    argTypes[prop.name] = {
      description: description,
      attr: prop.attr,
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
    } else if (tip === 'number') {
      argTypes[prop.name].control = {
        type: 'number'
      };
    }
    argTypes[prop.name].defaultValue = getDefaultValue(argTypes[prop.name]);
  }
  filterPaddingProps(argTypes);
  filterMarginProps(argTypes);
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

  const propsToAttributes = Object.entries(args).reduce(
    (acc, [prop, value]) => ({
      ...acc,
      [argTypes[prop] ? argTypes[prop].attr : prop]: value,
    }),
    {}
  );

  const attrs = camelKeysToKebab(propsToAttributes);

  for (const key in attrs) {
    if (!attrs.hasOwnProperty(key)) continue;
    attrs[key] = attrs[key] === false && !isTrueByDefault(key) ? null : attrs[key];
  }
  return spread(attrs);
}
