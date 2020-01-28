import { getJSONDiff } from '../src';
import getJSONData from '../src/parsers';

const result = getJSONData('__tests__/fixtures/result.json');
const jsonBefore = getJSONData('__tests__/fixtures/before.json');
const jsonAfter = getJSONData('__tests__/fixtures/after.json');
const ymlBefore = getJSONData('__tests__/fixtures/before.yml');
const ymlAfter = getJSONData('__tests__/fixtures/after.yml');
const iniBefore = getJSONData('__tests__/fixtures/before.ini');
const iniAfter = getJSONData('__tests__/fixtures/after.ini');


test('getJSONDiff', () => {
  expect(getJSONDiff(jsonBefore, jsonAfter)).toEqual(result);
  expect(getJSONDiff(ymlBefore, ymlAfter)).toEqual(result);
  expect(getJSONDiff(iniBefore, iniAfter)).toEqual(result);
});
