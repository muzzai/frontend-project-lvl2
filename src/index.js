import { has } from 'lodash';
import getData from './utils';


export default (beforePath, afterPath) => {
  const before = JSON.parse(getData(beforePath));
  const after = JSON.parse(getData(afterPath));
  const keys = [...new Set(Object.keys(after).concat(Object.keys(before)))];
  return keys.reduce((acc, key) => {
    const { [key]: valBefore } = before;
    const { [key]: valAfter } = after;
    const added = `+ ${key}: ${valAfter}`;
    const removed = `- ${key}: ${valBefore}`;
    if (valBefore !== valAfter) {
      if (has(after, key) && has(before, key)) {
        return `${acc}\n${removed}\n${added}`;
      }
      return has(before, key) ? `${acc}\n${removed}` : `${acc}\n${added}`;
    }
    return `${acc}\n  ${key}: ${valBefore}`;
  }, '');
};
