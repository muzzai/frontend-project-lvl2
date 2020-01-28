import { getJSONDiff } from '../src';
import getData from '../src/utils';

const result = getData('__tests__/fixtures/result.json');
const before = getData('__tests__/fixtures/before.json');
const after = getData('__tests__/fixtures/after.json');

test('gettJSONDiff', () => {
  expect(getJSONDiff(before, after)).toEqual(result);
});
