import getParser from './parsers';
import { getFileExtension, readFromFile } from './utils';
import genDiff from './buildDiff';
import getFormatter from './formatters';


export default (firstPath, secondPath, format = 'tree') => {
  const firstData = readFromFile(firstPath);
  const secondData = readFromFile(secondPath);
  const firstExtension = getFileExtension(firstPath);
  const secondExtension = getFileExtension(secondPath);
  const parseFirstConfig = getParser(firstExtension);
  const parseSecondConfig = getParser(secondExtension);
  const first = parseFirstConfig(firstData);
  const second = parseSecondConfig(secondData);
  const diff = genDiff(first, second);
  const makeFormatted = getFormatter(format);
  return makeFormatted(diff);
};
