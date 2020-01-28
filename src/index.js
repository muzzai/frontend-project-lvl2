import { has } from 'lodash';
import getJSONData from './parsers';
import printer from './printers';


export const getJSONDiff = (before, after) => {
  const keys = [...new Set(Object.keys(before).concat(Object.keys(after)))];
  return keys.reduce((acc, key) => {
    const { [key]: valBefore } = before;
    const { [key]: valAfter } = after;
    if (valBefore !== valAfter) {
      const added = { [`+ ${key}`]: String(valAfter) };
      const removed = { [`- ${key}`]: String(valBefore) };
      if (has(after, key) && has(before, key)) {
        return { ...acc, ...removed, ...added };
      }
      return has(before, key) ? { ...acc, ...removed } : { ...acc, ...added };
    }
    return { ...acc, [`  ${key}`]: String(valBefore) };
  }, {});
};

export const gendiff = (beforePath, afterPath) => {
  const before = getJSONData(beforePath);
  const after = getJSONData(afterPath);
  const diff = getJSONDiff(before, after);
  return printer(diff);
};
