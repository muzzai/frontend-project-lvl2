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
  unchanged: (indent, name, value) => `${getNSpaces(indent + 1)}${name}: ${stringify(value, indent + 1)}`,
  replaced: (indent, name, value, valueReplaced) => `${getNSpaces(indent)}  - ${name}: ${stringify(value, indent + 1)}\n${getNSpaces(indent)}  + ${name}: ${stringify(valueReplaced, indent + 1)}`,
  added: (indent, name, value) => `${getNSpaces(indent)}  + ${name}: ${stringify(value, indent + 1)}`,
  removed: (indent, name, value) => `${getNSpaces(indent)}  - ${name}: ${stringify(value, indent + 1)}`,
  parent: (indent, name, value, valueReplaced, func, children) => `${getNSpaces(indent + 1)}${name}: ${func(children, indent + 1)}`,
};

const printTreeFormat = (diff, indent) => `{${diff.reduce((acc, setting) => {
  const {
    type, name, value, valueReplaced, children,
  } = setting;
  return `${acc}\n${treeFormatTable[type](indent, name, value, valueReplaced, printTreeFormat, children)}`;
}, '')}\n${getNSpaces(indent)}}`;

export default (diff) => printTreeFormat(diff, 0);
