import yaml from 'yamljs';
import ini from 'ini';
import { isObject } from 'lodash';

const getNumsInsteadOfStrings = (obj) => {
  const keys = Object.keys(obj);
  return keys.reduce((acc, key) => {
    const value = obj[key];
    if (isObject(value)) return { ...acc, [key]: getNumsInsteadOfStrings(value) };
    if (/^\d+$/.test(value)) return { ...acc, [key]: parseInt(value, 10) };
    if (/^\d+\.\d+$/.test(value)) return { ...acc, [key]: parseFloat(value) };
    return { ...acc, [key]: value };
  }, {});
};

export default (ext) => {
  const parsers = {
    '.yml': yaml.parse,
    '.json': JSON.parse,
    '.ini': (iniData) => getNumsInsteadOfStrings(ini.parse(iniData)),
  };
  return parsers[ext];
};
