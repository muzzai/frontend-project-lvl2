import yaml from 'yamljs';
import ini from 'ini';

const getNumsInsteadOfStrings = (obj) => {
  const keys = Object.keys(obj);
  return keys.reduce((acc, key) => {
    const value = obj[key];
    if (typeof (value) === 'object') {
      return { ...acc, [key]: getNumsInsteadOfStrings(value) };
    }
    if (/^\d+$/.test(value)) return { ...acc, [key]: parseInt(value, 10) };
    if (/^\d+\.\d+$/.test(value)) return { ...acc, [key]: parseFloat(value) };
    return { ...acc, [key]: value };
  }, {});
};

export default {
  yml: yaml.parse,
  json: JSON.parse,
  ini: (iniData) => getNumsInsteadOfStrings(ini.parse(iniData)),
};
