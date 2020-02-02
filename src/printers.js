import { uniq, has } from 'lodash';

const getNTabsIndent = (num) => {
  let result = '';
  for (let i = 0; i < num; i += 1) {
    result = `${result}\t`;
  }
  return result;
};

const compareobjKeys = (key1, key2) => {
  if (key1 > key2) {
    return 1;
  }
  if (key1 < key2) {
    return -1;
  }
  return 0;
};

/* const print = (obj, indent) => {
  const objKeys = Object.keys(obj).sort(compareobjKeys);
  const tabs = getNTabsIndent(indent);
  return `{${tabs}${objKeys.reduce((acc, key) => {
    const value = obj[key];
    if (typeof (value) === 'object') {
      return `${acc}\n${tabs}${key}: ${print(value, indent + 1)}`;
    }
    return `${acc}\n${tabs}${key}: ${obj[key]}`;
  }, '')}\n${tabs}}`;
};  */

const isAdded = (value) => has(value, 'valAfter');
const isRemoved = (value) => has(value, 'valBefore')
const isReplaced = (value) =>  isRemoved(value) && isAdded(value);
const isParent = (value) => typeof (value) === 'object' && !isRemoved(value) && !isAdded(value);

const printTreeFormat = (diff) => {
  const print = (obj, indent) => {
    if (typeof (obj) !== 'object') {
      return String(obj);
    }
    const objKeys = Object.keys(obj).sort(compareobjKeys);
    const tabs = getNTabsIndent(indent);
    return `{${tabs}${objKeys.reduce((acc, key) => {
      const value = obj[key];
      if (isParent(value)) {
        return `${acc}\n${tabs}  ${key}: ${print(value, indent + 1)}`;
      }
      let newAcc = '';
      if (isRemoved(value)) {
        newAcc = `${newAcc}\n${tabs}- ${key}: ${print(value['valBefore'], indent + 1)}`;
      }
      if (isAdded(value)) {
        newAcc = `${newAcc}\n${tabs}+ ${key}: ${print(value['valAfter'], indent + 1)}`;
      }
      return newAcc ? `${acc}${tabs}${newAcc}`: `${acc}\n${tabs}  ${key}: ${obj[key]}`; 
    }, '')}\n${tabs}}`;
  };
  return print(diff, 0);
};



export default printTreeFormat;
