import { isObject } from 'lodash';

const getNSpaces = (num) => '    '.repeat(num);
const stringify = (obj, indent) => {
  if (isObject(obj)) {
    return `{${Object
      .keys(obj)
      .reduce((acc, key) => `${acc}\n${getNSpaces(indent + 1)}${key}: ${obj[key]}`, '')}\n${getNSpaces(indent)}}`;
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

const render = (diff, indent) => `{${diff.reduce((acc, setting) => {
  const {
    type, name, previousValue, newValue, children,
  } = setting;
  return `${acc}\n${treeFormatTable[type](indent, name, previousValue, newValue, render, children)}`;
}, '')}\n${getNSpaces(indent)}}`;

export default (diff) => render(diff, 0);
