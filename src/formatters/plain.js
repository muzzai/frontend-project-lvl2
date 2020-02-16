import { flatten, isObject } from 'lodash';

const stringify = (value) => {
  if (isObject(value)) return '[complex value]';
  return typeof (value) === 'string' ? `'${value}'` : value;
};

const plainDescriptions = {
  unchanged: () => [],
  changed: (name, previousValue, newValue) => `Property '${name}' was changed from ${stringify(previousValue)} to ${stringify(newValue)}.`,
  added: (name, previousValue, newValue) => `Property '${name}' was added with value ${stringify(newValue)}.`,
  removed: (name) => `Property '${name}' was removed.`,
  parent: (name, value, newValue, func, children) => func(children, name),
};

const render = (diff, parentName) => {
  const described = diff
    .map((setting) => {
      const {
        type, name, previousValue, newValue, children,
      } = setting;
      const plainName = parentName ? `${parentName}.${name}` : name;
      const makeDescription = plainDescriptions[type];
      return makeDescription(plainName, previousValue, newValue, render, children);
    });
  return flatten(described).join('\n');
};

export default render;
