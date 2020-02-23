import { extname } from 'path';
import { readFileSync } from 'fs';
import getParser from './parsers';
import genDiff from './buildDiff';
import getFormatter from './formatters';


export default (firstPath, secondPath, format = 'tree') => {
  const firstData = readFileSync(firstPath, 'utf-8');
  const secondData = readFileSync(secondPath, 'utf-8');
  const firstExtension = extname(firstPath);
  const secondExtension = extname(secondPath);
  const parseFirstConfig = getParser(firstExtension);
  const parseSecondConfig = getParser(secondExtension);
  const first = parseFirstConfig(firstData);
  const second = parseSecondConfig(secondData);
  const diff = genDiff(first, second);
  const makeFormatted = getFormatter(format);
  return makeFormatted(diff);
};
