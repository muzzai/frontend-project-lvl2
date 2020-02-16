import renderPlainFormat from './plain';
import renderTreeFormat from './tree';
import renderJSONFormat from './json';

export default (type) => {
  const formatters = {
    tree: renderTreeFormat,
    plain: renderPlainFormat,
    json: renderJSONFormat,
  };
  return formatters[type];
};
