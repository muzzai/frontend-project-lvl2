import printPlainFormat from './plain';
import printTreeFormat from './tree';
import printJSONFormat from './json';

export default {
  tree: printTreeFormat,
  plain: printPlainFormat,
  json: printJSONFormat,
};
