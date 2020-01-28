import gendiff from '../src';
import getData from '../src/utils';

const result = getData('__tests__/fixtures/result.json');

test('gendiff', () => {
  expect(gendiff('__tests__/fixtures/before.json', '__tests__/fixtures/after.json')).toEqual(result);
});
