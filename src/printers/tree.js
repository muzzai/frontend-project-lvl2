import { isObject } from 'lodash';

const get2NSpaces = (num) => '  '.repeat(num);

const treeFormatTable = {
  unchanged: (name, value) => ({ [`  ${name}`]: value }),
  replaced: (name, value, valueReplaced) => ({ [`- ${name}`]: value, [`+ ${name}`]: valueReplaced }),
  added: (name, value) => ({ [`+ ${name}`]: value }),
  removed: (name, value) => ({ [`- ${name}`]: value }),
};
const convertToObject = (diff) => diff.reduce((acc, setting) => {
  const {
    type, name, value, valueReplaced, children,
  } = setting;
  if (type === 'parent') return { ...acc, [`  ${name}`]: convertToObject(children) };
  return { ...acc, ...treeFormatTable[type](name, value, valueReplaced) };
}, {});

const reduceToText = (obj, indent) => {
  if (!isObject(obj)) return String(obj);
  const spaces = get2NSpaces(indent);
  return `{${Object.keys(obj).reduce((acc, key) => {
    const value = obj[key];
    if (isObject(value)) return `${acc}\n${spaces}${key}: ${reduceToText(value, indent + 1)}`;
    return `${acc}\n${spaces}${key}: ${value}`;
  }, '')}\n${spaces}}`;
};
export default (diff) => reduceToText(convertToObject(diff), 0);
