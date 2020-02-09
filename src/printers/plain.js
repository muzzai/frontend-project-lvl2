import { flatten } from 'lodash';

const printPlainValue = (value) => (typeof (value) === 'object' ? '[complex value]' : value);

const plainDescriptions = {
  unchanged: () => {},
  replaced: (name, value, valueReplaced) => `Property '${name}' was replaced from '${printPlainValue(value)}' to '${printPlainValue(valueReplaced)}'.`,
  added: (name, value) => `Property '${name}' was added with value '${printPlainValue(value)}'.`,
  removed: (name) => `Property '${name}' was removed.`,
};

const printPlainFormat = (diff, parentName) => {
  const descripted = flatten(diff
    .map((setting) => {
      const {
        type, name, value, valueReplaced, children,
      } = setting;
      const plainName = parentName ? `${parentName}.${name}` : name;
      if (type === 'parent') return printPlainFormat(children, plainName);
      return plainDescriptions[type](plainName, value, valueReplaced);
    }));
  return descripted
    .filter((record) => record !== undefined)
    .join('\n');
};

export default printPlainFormat;
