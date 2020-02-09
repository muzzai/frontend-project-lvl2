import { isObject, flatten } from 'lodash';
import { writeFileSync } from 'fs';

const get2NSpaces = (num) => '  '.repeat(num);
const printPlainValue = (value) => (typeof (value) === 'object' ? '[complex value]' : value);
const stringify = (val, indent) => {
  const spaces = get2NSpaces(indent);
  if (isObject(val)) {
    return Object.keys(val).reduce((acc, key) => `{\n${spaces}${acc}${key}: ${val[key]}\n${spaces}}`, '');
  }
  return val;
};

const plainDescriptions = {
  unchanged: () => {},
  replaced: (name, value, valueReplaced) => `Property '${name}' was replaced from '${printPlainValue(value)}' to '${printPlainValue(valueReplaced)}'.`,
  added: (name, value) => `Property '${name}' was added with value '${printPlainValue(value)}'.`,
  removed: (name) => `Property '${name}' was removed.`,
};

const treeFromatTable = {
  unchanged: (indent, name, value) => `${get2NSpaces(indent)}  ${name}: ${stringify(value, indent + 2)}`,
  replaced: (indent, name, value, valueReplaced) => `${get2NSpaces(indent)}- ${name}: ${stringify(value, indent + 2)}\n${get2NSpaces(indent)}+ ${name}: ${stringify(valueReplaced, indent + 2)}`,
  added: (indent, name, value) => `${get2NSpaces(indent)}+ ${name}: ${stringify(value, indent + 2)}`,
  removed: (indent, name, value) => `${get2NSpaces(indent)}- ${name}: ${stringify(value, indent + 2)}`,
};


const printTreeFormat = (diff) => {
  const print = (tree, indent) => {
    const spaces = get2NSpaces(indent);
    return `{${tree.reduce((acc, setting) => {
      const {
        type, name, value, valueReplaced, children,
      } = setting;
      if (children) return `${acc}\n${spaces}  ${name}: ${print(children, indent + 1)}`;
      return `${acc}\n${treeFromatTable[type](indent + 1, name, value, valueReplaced)}`;
    }, '')}\n${spaces}}`;
  };
  return print(diff, 0);
};


const printPlainFormat = (diff, parentName) => {
  const descripted = flatten(diff
    .map((setting) => {
      const {
        type, name, value, valueReplaced, children,
      } = setting;
      const plainName = parentName ? `${parentName}.${name}` : name;
      if (children) return printPlainFormat(children, plainName);
      return plainDescriptions[type](plainName, value, valueReplaced);
    }));
  return descripted
    .filter((record) => record !== undefined)
    .join('\n');
};

export default {
  tree: printTreeFormat,
  plain: printPlainFormat,
  json: (diff) => writeFileSync('diff.json', JSON.stringify(diff, null, 2)),
};
