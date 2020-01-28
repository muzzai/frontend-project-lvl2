import { has } from 'lodash';
import getData from './utils';


export default (beforePath, afterPath) => {
  const before = getData(beforePath);
  const after = getData(afterPath);
  const keys = [...new Set(Object.keys(after).concat(Object.keys(before)))];
  return keys.reduce((acc, key) => {
    const { [key]: valBefore } = before;
    const { [key]: valAfter } = after;
    if (valBefore !== valAfter) {
      const added = { [`+ ${key}`]: valAfter };
      const removed = { [`- ${key}`]: valBefore };
      if (has(after, key) && has(before, key)) {
        return { ...acc, ...removed, ...added };
      }
      return has(before, key) ? { ...acc, ...removed } : { ...acc, ...added };
    }
    return { ...acc, [`  ${key}`]: valBefore };
  }, {});
};
