import { readFileSync } from 'fs';
import yaml from 'yamljs';

const JSONparser = (path) => JSON.parse(readFileSync(path, 'utf8'));
const YAMLparser = (path) => yaml.parse(readFileSync(path, 'utf8'));
const getFileType = (path) => path.split('.').pop();

export default (path) => {
  const parsers = {
    yml: YAMLparser,
    json: JSONparser,
  };
  return parsers[getFileType(path)](path);
};
