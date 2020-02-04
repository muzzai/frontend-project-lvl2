import { has } from 'lodash';
import getParsedData from './parsers';
import print from './printers';


const isObjects = (data1, data2) => typeof (data1) === 'object' && typeof (data2) === 'object';

export const genDiff = (before, after) => {
  const keys = [...new Set(Object.keys(before).concat(Object.keys(after)))];
  return keys.reduce((acc, key) => {
    const { [key]: valBefore } = before;
    const { [key]: valAfter } = after;
    if (isObjects(valBefore, valAfter)) {
      return { ...acc, [key]: genDiff(valBefore, valAfter) };
    }
    if (valBefore === valAfter) {
      return { ...acc, [key]: valBefore };
    }
    if (has(after, key) && has(before, key)) {
      return { ...acc, [key]: { valBefore, valAfter } };
    }
    return has(before, key) ? { ...acc, [key]: { valBefore } } : { ...acc, [key]: { valAfter } };
  }, {});
};


export default (beforePath, afterPath, format = 'tree') => {
  const before = getParsedData(beforePath);
  const after = getParsedData(afterPath);
  const diff = genDiff(before, after);
  return print[format](diff);
};
