import { getJSONDiff } from '../src';
import getParser from '../src/parsers';

const result = getParser('__tests__/fixtures/result.json');
const jsonBefore = getParser('__tests__/fixtures/before.json');
const jsonAfter = getParser('__tests__/fixtures/after.json');
const ymlBefore = getParser('__tests__/fixtures/before.yml');
const ymlAfter = getParser('__tests__/fixtures/after.yml');
const iniBefore = getParser('__tests__/fixtures/before.ini');
const iniAfter = getParser('__tests__/fixtures/after.ini');


test('getJSONDiff', () => {
  expect(getJSONDiff(jsonBefore, jsonAfter)).toEqual(result);
  expect(getJSONDiff(ymlBefore, ymlAfter)).toEqual(result);
  expect(getJSONDiff(iniBefore, iniAfter)).toEqual(result);
});
