import { flatten, isObject } from 'lodash';

const stringify = (value) => {
  if (isObject(value)) return '[complex value]';
  return typeof (value) === 'string' ? `'${value}'` : value;
};

const plainDescriptions = {
  unchanged: () => [],
  changed: (name, value, changedValue) => `Property '${name}' was changed from ${stringify(value)} to ${stringify(changedValue)}.`,
  added: (name, value) => `Property '${name}' was added with value ${stringify(value)}.`,
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
