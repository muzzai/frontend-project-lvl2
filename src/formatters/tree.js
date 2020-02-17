import { isObject } from 'lodash';

const getNSpaces = (num) => '    '.repeat(num);
const stringify = (value, indent) => {
  if (isObject(value)) {
    const text = Object.keys(value)
      .map((key) => `${getNSpaces(indent)}    ${key}: ${value[key]}`)
      .join('\n');
    return `{\n${text}\n${getNSpaces(indent)}}`;
  }
  return value;
};

const treeFormatTable = {
  parent: (indent, name, previousValue, newValue, func, children) => (
    `${getNSpaces(indent)}    ${name}: ${func(children, indent + 1)}`
  ),
  unchanged: (indent, name, previousValue) => (
    `${getNSpaces(indent)}    ${name}: ${stringify(previousValue, indent + 1)}`
  ),
  removed: (indent, name, previousValue) => (
    `${getNSpaces(indent)}  - ${name}: ${stringify(previousValue, indent + 1)}`
  ),
  changed: (indent, name, previousValue, newValue) => (
    `${getNSpaces(indent)}  - ${name}: ${stringify(previousValue, indent + 1)}\n${getNSpaces(indent)}  + ${name}: ${stringify(newValue, indent + 1)}`
  ),
  added: (indent, name, previousValue, newValue) => (
    `${getNSpaces(indent)}  + ${name}: ${stringify(newValue, indent + 1)}`
  ),
};

const render = (diff, indent) => {
  const tree = diff
    .map((setting) => {
      const {
        type, name, previousValue, newValue, children,
      } = setting;
      const makeFormatted = treeFormatTable[type];
      return makeFormatted(indent, name, previousValue, newValue, render, children);
    })
    .join('\n');
  return `{\n${tree}\n${getNSpaces(indent)}}`;
};

export default (diff) => render(diff, 0);
