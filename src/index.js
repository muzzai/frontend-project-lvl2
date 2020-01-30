import { has } from 'lodash';
import getParser from './parsers';
import printer from './printers';


const isObjects = (data1, data2) => typeof (data1) === 'object' && typeof (data2) === 'object';

export const getJSONDiff = (before, after) => {
  const keys = [...new Set(Object.keys(before).concat(Object.keys(after)))];
  return keys.reduce((acc, key) => {
    const { [key]: valBefore } = before;
    const { [key]: valAfter } = after;
    if (isObjects(valBefore, valAfter)) {
      return { ...acc, [`  ${key}`]: getJSONDiff(valBefore, valAfter) };
    }
    if (valBefore === valAfter) {
      return { ...acc, [`  ${key}`]: valBefore };
    }
    const added = { [`+ ${key}`]: valAfter };
    const removed = { [`- ${key}`]: valBefore };
    if (has(after, key) && has(before, key)) {
      return { ...acc, ...removed, ...added };
    }
    return has(before, key) ? { ...acc, ...removed } : { ...acc, ...added };
  }, {});
};


export const gendiff = (beforePath, afterPath) => {
  const before = getParser(beforePath);
  const after = getParser(afterPath);
  const diff = getJSONDiff(before, after);
  return printer(diff, 0);
};
