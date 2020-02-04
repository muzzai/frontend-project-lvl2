import { readFileSync } from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';

const getNumsInsteadOfStrings = (obj) => {
  const keys = Object.keys(obj);
  return keys.reduce((acc, key) => {
    const value = obj[key];
    if (typeof (value) === 'object') {
      return { ...acc, [key]: getNumsInsteadOfStrings(value) };
    }
    if (value === String(parseInt(value, 10))) {
      return { ...acc, [key]: parseInt(value, 10) };
    }
    return { ...acc, [key]: value };
  }, {});
};

const JSONparser = (path) => JSON.parse(readFileSync(path, 'utf8'));
const YAMLparser = (path) => yaml.load(readFileSync(path, 'utf8'));
const INIparser = (path) => getNumsInsteadOfStrings(ini.parse(readFileSync(path, 'utf8')));
const getFileType = (path) => path.split('.').pop();

export default (path) => {
  const parsers = {
    yml: YAMLparser,
    json: JSONparser,
    ini: INIparser,
  };
  return parsers[getFileType(path)](path);
};
