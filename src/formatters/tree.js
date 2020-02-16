import { isObject } from 'lodash';

const getNSpaces = (num) => '    '.repeat(num);
const stringify = (obj, indent) => {
  if (isObject(obj)) {
    const text = Object.keys(obj)
      .map((key) => `${getNSpaces(indent + 1)}${key}: ${obj[key]}`)
      .join('\n');
    return `{\n${text}\n${getNSpaces(indent)}}`;
  }
  return obj;
};

const treeFormatTable = {
  unchanged: (indent, name, previousValue) => (
    `${getNSpaces(indent + 1)}${name}: ${stringify(previousValue, indent + 1)}`
  ),
  changed: (indent, name, previousValue, newValue) => (
    `${getNSpaces(indent)}  - ${name}: ${stringify(previousValue, indent + 1)}\n${getNSpaces(indent)}  + ${name}: ${stringify(newValue, indent + 1)}`
  ),
  added: (indent, name, previousValue, newValue) => (
    `${getNSpaces(indent)}  + ${name}: ${stringify(newValue, indent + 1)}`
  ),
  removed: (indent, name, previousValue) => (
    `${getNSpaces(indent)}  - ${name}: ${stringify(previousValue, indent + 1)}`
  ),
  parent: (indent, name, previousValue, newValue, func, children) => (
    `${getNSpaces(indent + 1)}${name}: ${func(children, indent + 1)}`
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
