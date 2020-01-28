import { readFileSync } from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';

const JSONparser = (path) => JSON.parse(readFileSync(path, 'utf8'));
const YAMLparser = (path) => yaml.load(readFileSync(path, 'utf8'));
const INIparser = (path) => ini.parse(readFileSync(path, 'utf8'));
const getFileType = (path) => path.split('.').pop();

export default (path) => {
  const parsers = {
    yml: YAMLparser,
    json: JSONparser,
    ini: INIparser,
  };
  return parsers[getFileType(path)](path);
};
