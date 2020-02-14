import { flatten } from 'lodash';

const printPlainValue = (value) => (typeof (value) === 'object' ? '[complex value]' : value);

const plainDescriptions = {
  unchanged: () => [],
  replaced: (name, value, valueReplaced) => `Property '${name}' was replaced from '${printPlainValue(value)}' to '${printPlainValue(valueReplaced)}'.`,
  added: (name, value) => `Property '${name}' was added with value '${printPlainValue(value)}'.`,
  removed: (name) => `Property '${name}' was removed.`,
  parent: (name, value, valueReplaced, func, children) => func(children, name),
};

const printPlainFormat = (diff, parentName) => {
  const described = diff
    .map((setting) => {
      const {
        type, name, value, valueReplaced, children,
      } = setting;
      const plainName = parentName ? `${parentName}.${name}` : name;
      return plainDescriptions[type](plainName, value, valueReplaced, printPlainFormat, children);
    });
  return flatten(described).join('\n');
};

export default printPlainFormat;
