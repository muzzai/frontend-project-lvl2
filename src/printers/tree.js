import { isObject } from 'lodash';

const get4NSpaces = (num) => '    '.repeat(num);
const stringify = (obj, indent) => {
  if (isObject(obj)) {
    return `{${Object
      .keys(obj)
      .reduce((acc, key) => `${acc}\n${get4NSpaces(indent + 1)}${key}: ${obj[key]}`, '')}\n${get4NSpaces(indent)}}`;
  }
  return obj;
};

const treeFormatTable = {
  unchanged: (indent, name, value) => `${get4NSpaces(indent + 1)}${name}: ${stringify(value, indent + 1)}`,
  replaced: (indent, name, value, valueReplaced) => `${get4NSpaces(indent)}  - ${name}: ${stringify(value, indent + 1)}\n${get4NSpaces(indent)}  + ${name}: ${stringify(valueReplaced, indent + 1)}`,
  added: (indent, name, value) => `${get4NSpaces(indent)}  + ${name}: ${stringify(value, indent + 1)}`,
  removed: (indent, name, value) => `${get4NSpaces(indent)}  - ${name}: ${stringify(value, indent + 1)}`,
};

const printTreeFormat = (diff, indent) => `{${diff.reduce((acc, setting) => {
  const {
    type, name, value, valueReplaced, children,
  } = setting;
  if (type === 'parent') return `${acc}\n${get4NSpaces(indent)}    ${name}: ${printTreeFormat(children, indent + 1)}`;
  return `${acc}\n${treeFormatTable[type](indent, name, value, valueReplaced)}`;
}, '')}\n${get4NSpaces(indent)}}`;

export default (diff) => printTreeFormat(diff, 0);
