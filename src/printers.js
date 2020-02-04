import { has } from 'lodash';
import { writeFileSync } from 'fs';

const getTwoSpacesIndent = (num) => '  '.repeat(num);
const printPlainValue = (value) => (typeof (value) === 'object' ? '[complex value]' : value);


const isAdded = (value) => has(value, 'valAfter');
const isRemoved = (value) => has(value, 'valBefore');
const isReplaced = (value) => isRemoved(value) && isAdded(value);
const isParent = (value) => typeof (value) === 'object' && !isRemoved(value) && !isAdded(value);


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
      return isAdded(value) ? [...acc, { path: newAnc, added: value.valAfter }] : acc;
    }, []);
  };
  return findPathsToChanges(diff, []);
};

const convertChangesToText = (changes) => changes
  .map((change) => {
    const { path, removed, added } = change;
    const addedVal = printPlainValue(added);
    const removedVal = printPlainValue(removed);
    const propertyPath = path.join('.');
    if (has(change, 'removed') && has(change, 'added')) {
      return `Property '${propertyPath}' was replaced from '${removedVal}' to '${addedVal}'.`;
    }
    return has(change, 'removed') ? `Property '${propertyPath}' was deleted.`
      : `Property '${propertyPath}' was added with value: '${addedVal}'.`;
  })
  .sort()
  .join('\n');

const printPlainFormat = (diff) => convertChangesToText(findChanges(diff));

const printTreeFormat = (diff) => {
  const print = (obj, indent) => {
    if (typeof (obj) !== 'object') {
      return String(obj);
    }
    const objKeys = Object.keys(obj).sort();
    const spaces = getTwoSpacesIndent(indent);
    return `{${objKeys.reduce((acc, key) => {
      const value = obj[key];
      if (isParent(value)) {
        return `${acc}\n${spaces}  ${key}: ${print(value, indent + 1)}`;
      }
      let newAcc = '';
      if (isRemoved(value)) {
        newAcc = `\n${spaces}- ${key}: ${print(value.valBefore, indent + 1)}`;
      }
      if (isAdded(value)) {
        newAcc = `${newAcc}\n${spaces}+ ${key}: ${print(value.valAfter, indent + 1)}`;
      }
      return newAcc ? `${acc}${spaces}${newAcc}` : `${acc}\n${spaces}  ${key}: ${obj[key]}`;
    }, '')}\n${spaces}}`;
  };
  return print(diff, 0);
};

export default {
  tree: printTreeFormat,
  plain: printPlainFormat,
  json: (diff) => writeFileSync('diff.json', JSON.stringify(diff, null, 2)),
};
