import { has } from 'lodash';
import parsers from './parsers';
import { getFileExtension, readFromFile } from './utils';
import genDiff from './buildDiff';
import print from './printers';


export default (beforePath, afterPath, format = 'tree') => {
  const dataBefore = readFromFile(beforePath);
  const dataAfter = readFromFile(afterPath);
  const extensionBefore = getFileExtension(beforePath);
  const extensionAfter = getFileExtension(afterPath);
  const before = parsers[extensionBefore](dataBefore);
  const after = parsers[extensionAfter](dataAfter);
  const diff = genDiff(before, after);
  return has(print, format) ? print[format](diff) : 'Unknown format';
};
