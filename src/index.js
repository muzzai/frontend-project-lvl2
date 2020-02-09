import { has } from 'lodash';
import getParsedData from './parsers';
import print from './printers';


const isObjects = (data1, data2) => typeof (data1) === 'object' && typeof (data2) === 'object';

const treeOfTypes = [
  {
    check: (key, before, after) => before[key] === after[key],
    getData: (key, before) => ({
      name: key,
      type: 'unchanged',
      value: before[key],
    }),
  },
  {
    check: (key, before, after) => has(before, key) && !has(after, key),
    getData: (key, before) => ({
      name: key,
      type: 'removed',
      value: before[key],
    }),
  },
  {
    check: (key, before, after) => !has(before, key) && has(after, key),
    getData: (key, before, after) => ({
      name: key,
      type: 'added',
      value: after[key],
    }),
  },
  {
    check: (key, before, after) => isObjects(before[key], after[key]),
    getData: (key, before, after, func) => ({
      name: key,
      type: 'parent',
      children: func(before[key], after[key]),
    }),
  },
  {
    check: (key, before, after) => has(before, key) && has(after, key),
    getData: (key, before, after) => ({
      name: key,
      type: 'replaced',
      value: before[key],
      valueReplaced: after[key],
    }),
  },
];

const compareNodes = (node1, node2) => {
  const { name: a } = node1;
  const { name: b } = node2;
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
};
export const genDiff = (before, after) => {
  const keys = [...new Set(Object.keys(before).concat(Object.keys(after)))];
  return keys
    .map((key) => treeOfTypes
      .find((type) => type.check(key, before, after))
      .getData(key, before, after, genDiff))
    .sort(compareNodes);
};

export default (beforePath, afterPath, format = 'tree') => {
  const before = getParsedData(beforePath);
  const after = getParsedData(afterPath);
  const diff = genDiff(before, after);
  return print[format](diff);
};
