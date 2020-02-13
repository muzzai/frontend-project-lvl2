import { has } from 'lodash';

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
    getData: (key, _, after) => ({
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

const genDiff = (before, after) => {
  const keys = [...new Set(Object.keys(before).concat(Object.keys(after)).sort())];
  return keys
    .map((key) => treeOfTypes
      .find((type) => type.check(key, before, after))
      .getData(key, before, after, genDiff));
};

export default genDiff;
