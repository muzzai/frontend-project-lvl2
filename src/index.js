import parsers from './parsers';
import { getFileType, readFromFile } from './utils';
import genDiff from './buildDiff';
import print from './printers';


export default (beforePath, afterPath, format = 'tree') => {
  const data1 = readFromFile(beforePath);
  const data2 = readFromFile(afterPath);
  const extension1 = getFileType(beforePath);
  const extension2 = getFileType(afterPath);
  const before = parsers[extension1](data1);
  const after = parsers[extension2](data2);
  const diff = genDiff(before, after);
  return print[format](diff);
};
