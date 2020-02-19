import { has, union, isObject } from 'lodash';

const isObjects = (data1, data2) => isObject(data1) && isObject(data2);

const treeOfTypes = [
  {
    check: (key, before, after) => before[key] === after[key],
    getData: (key, before) => ({
      name: key,
      type: 'unchanged',
      previousValue: before[key],
      currentValue: null,
    }),
  },
  {
    check: (key, before, after) => has(before, key) && !has(after, key),
    getData: (key, before) => ({
      name: key,
      type: 'removed',
      previousValue: before[key],
      currentValue: null,
    }),
  },
  {
    check: (key, before, after) => !has(before, key) && has(after, key),
    getData: (key, _, after) => ({
      name: key,
      type: 'added',
      previousValue: null,
      currentValue: after[key],
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
      type: 'changed',
      previousValue: before[key],
      currentValue: after[key],
    }),
  },
];

const genDiff = (before, after) => {
  const beforeKeys = Object.keys(before);
  const afterKeys = Object.keys(after);
  const keys = union(beforeKeys, afterKeys).sort();
  return keys
    .map((key) => treeOfTypes
      .find((type) => type.check(key, before, after))
      .getData(key, before, after, genDiff));
};

export default genDiff;
