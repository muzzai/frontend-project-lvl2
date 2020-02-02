import { getDiff } from '../src';
import getParsedData from '../src/parsers';

const result = getParsedData('__tests__/fixtures/result.json');
const jsonBefore = getParsedData('__tests__/fixtures/before.json');
const jsonAfter = getParsedData('__tests__/fixtures/after.json');
const ymlBefore = getParsedData('__tests__/fixtures/before.yml');
const ymlAfter = getParsedData('__tests__/fixtures/after.yml');
const iniBefore = getParsedData('__tests__/fixtures/before.ini');
const iniAfter = getParsedData('__tests__/fixtures/after.ini');


test('getDiff', () => {
  expect(getDiff(jsonBefore, jsonAfter)).toEqual(result);
  expect(getDiff(ymlBefore, ymlAfter)).toEqual(result);
  expect(getDiff(iniBefore, iniAfter)).toEqual(result);
});
