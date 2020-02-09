import path from 'path';
import { flatten } from 'lodash';
import { readFileSync } from 'fs';
import printDiff from '../src';

const getFixturePath = (filename, ext) => path.join(__dirname, '__fixtures__', `${filename}.${ext}`);
const exts = ['json', 'yml', 'ini'];
const formats = ['tree', 'plain', 'json'];
const pairs = flatten(exts.map((ext) => formats.map((format) => [ext, format])));

test.each(pairs)('Test %s extension with %s format', (ext, format) => {
  const before = getFixturePath('before', ext);
  const after = getFixturePath('after', ext);
  const result = readFileSync(path.join(__dirname, '__fixtures__', `result.${format}`), 'utf-8');
  expect(printDiff(before, after, format)).toEqual(result);
});
