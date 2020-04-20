import { isObject } from 'lodash';

const stringify = (value) => {
  if (isObject(value)) return '[complex value]';
  return typeof (value) === 'string' ? `'${value}'` : value;
};

const plainDescriptions = {
  parent: (name, previousValue, currentValue, func, children) => func(children, name),
  unchanged: () => '',
  removed: (name) => `Property '${name}' was removed.`,
  changed: (name, previousValue, currentValue) => (
    `Property '${name}' was changed from ${stringify(previousValue)} to ${stringify(currentValue)}.`
  ),
  added: (name, previousValue, currentValue) => (
    `Property '${name}' was added with value ${stringify(currentValue)}.`
  ),
};

const render = (diff, parentName) => {
  const described = diff
    .map((setting) => {
      const {
        type, name, previousValue, currentValue, children,
      } = setting;
      const plainName = parentName ? `${parentName}.${name}` : name;
      const makeDescription = plainDescriptions[type];
      return makeDescription(plainName, previousValue, currentValue, render, children);
    });
  return described.filter((setting) => setting).join('\n');
};

export default render;
