import { flatten } from 'lodash';

const printPlainValue = (value) => (typeof (value) === 'object' ? '[complex value]' : value);

const plainDescriptions = {
  unchanged: () => [],
  changed: (name, value, changedValue) => `Property '${name}' was changed from '${printPlainValue(value)}' to '${printPlainValue(changedValue)}'.`,
  added: (name, value) => `Property '${name}' was added with value '${printPlainValue(value)}'.`,
  removed: (name) => `Property '${name}' was removed.`,
  parent: (name, value, changedValue, func, children) => func(children, name),
};

const printPlainFormat = (diff, parentName) => {
  const described = diff
    .map((setting) => {
      const {
        type, name, value, changedValue, children,
      } = setting;
      const plainName = parentName ? `${parentName}.${name}` : name;
      return plainDescriptions[type](plainName, value, changedValue, printPlainFormat, children);
    });
  return flatten(described).join('\n');
};

export default printPlainFormat;
