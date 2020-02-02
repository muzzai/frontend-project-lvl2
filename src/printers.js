import { has } from 'lodash';
import { writeFileSync } from 'fs';

const getNTabsIndent = (num) => '\t'.repeat(num);

const compareobjKeys = (key1, key2) => {
  if (key1 > key2) {
    return 1;
  }
  if (key1 < key2) {
    return -1;
  }
  return 0;
};

const isAdded = (value) => has(value, 'valAfter');
const isRemoved = (value) => has(value, 'valBefore');
const isReplaced = (value) => isRemoved(value) && isAdded(value);
const isParent = (value) => typeof (value) === 'object' && !isRemoved(value) && !isAdded(value);
const printPainValue = (value) => (typeof (value) === 'object' ? '[complex value]' : value);

const findChanges = (diff) => {
  const findPathsToChanges = (obj, anc) => {
    const keys = Object.keys(obj);
    return keys.reduce((acc, key) => {
      const value = obj[key];
      const newAnc = [...anc, key];
      if (isParent(value)) {
        return acc.concat(findPathsToChanges(value, newAnc));
      }
      if (isReplaced(value)) {
        return [...acc, { path: newAnc, removed: value.valBefore, added: value.valAfter }];
      }
      if (isRemoved(value)) {
        return [...acc, { path: newAnc, removed: value.valBefore }];
      }
      if (isAdded(value)) {
        return [...acc, { path: newAnc, added: value.valAfter }];
      }
      return acc;
    }, []);
  };
  return findPathsToChanges(diff, []);
};

const convertChangesToText = (changes) => changes
  .map((change) => {
    const { path, removed, added } = change;
    const addedVal = printPainValue(added);
    const removedVal = printPainValue(removed);
    const propertyPath = path.join('.');
    if (has(change, 'removed') && has(change, 'added')) {
      return `Property '${propertyPath}' was replaced from '${removedVal}' to '${addedVal}'.`;
    }
    return has(change, 'removed') ? `Property '${propertyPath}' was deleted.`
      : `Property '${propertyPath}' was added with value: '${addedVal}'.`;
  })
  .sort()
  .join('\n');

export const printPlainFormat = (diff) => convertChangesToText(findChanges(diff));

export const printTreeFormat = (diff) => {
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
        newAcc = `${newAcc}\n${tabs}- ${key}: ${print(value.valBefore, indent + 1)}`;
      }
      if (isAdded(value)) {
        newAcc = `${newAcc}\n${tabs}+ ${key}: ${print(value.valAfter, indent + 1)}`;
      }
      return newAcc ? `${acc}${tabs}${newAcc}` : `${acc}\n${tabs}  ${key}: ${obj[key]}`;
    }, '')}\n${tabs}}`;
  };
  return print(diff, 0);
};

export default {
  tree: printTreeFormat,
  plain: printPlainFormat,
  json: (diff) => writeFileSync('diff.json', JSON.stringify(diff, null, '\t')),
};
