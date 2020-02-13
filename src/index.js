import parsers from './parsers';
import { getFileType, readFromFile } from './utils';
import genDiff from './buildDiff';
import print from './printers';


export default (beforePath, afterPath, format = 'tree') => {
  const before = parsers[getFileType(beforePath)](readFromFile(beforePath));
  const after = parsers[getFileType(afterPath)](readFromFile(afterPath));
  const diff = genDiff(before, after);
  return print[format](diff);
};
