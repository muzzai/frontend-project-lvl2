import path from 'path';
import { genDiff } from '../src';
import getParsedData from '../src/parsers';

const getFixturePath = (filename, ext) => path.join(__dirname, '__fixtures__', `${filename}.${ext}`);
const exts = ['json', 'yml', 'ini'];

test.each([exts])('test %s extension', (ext) => {
  const before = getParsedData(getFixturePath('before', ext));
  const after = getParsedData(getFixturePath('after', ext));
  const result = getParsedData('__tests__/__fixtures__/result.json');
  expect(genDiff(before, after)).toEqual(result);
});
