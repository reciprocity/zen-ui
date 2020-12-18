import { cloneDeep } from "lodash";

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
