import getParser from './parsers';
import { getFileExtension, readFromFile } from './utils';
import genDiff from './buildDiff';
import getFormatter from './formatters';


export default (beforePath, afterPath, format = 'tree') => {
  const dataBefore = readFromFile(beforePath);
  const dataAfter = readFromFile(afterPath);
  const extensionBefore = getFileExtension(beforePath);
  const extensionAfter = getFileExtension(afterPath);
  const before = getParser(extensionBefore)(dataBefore);
  const after = getParser(extensionAfter)(dataAfter);
  const diff = genDiff(before, after);
  const makeFormatted = getFormatter(format) || (() => `\n'${format}' is invalid output format. Valid formats are: 'tree', 'plain', 'json'.`);
  return makeFormatted(diff);
};
