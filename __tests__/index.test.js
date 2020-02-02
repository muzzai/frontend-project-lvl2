import { getDiff } from '../src';
import getParser from '../src/parsers';

const result = getParser('__tests__/fixtures/result.json');
const jsonBefore = getParser('__tests__/fixtures/before.json');
const jsonAfter = getParser('__tests__/fixtures/after.json');
const ymlBefore = getParser('__tests__/fixtures/before.yml');
const ymlAfter = getParser('__tests__/fixtures/after.yml');
const iniBefore = getParser('__tests__/fixtures/before.ini');
const iniAfter = getParser('__tests__/fixtures/after.ini');


test('getDiff', () => {
  expect(getDiff(jsonBefore, jsonAfter)).toEqual(result);
  expect(getDiff(ymlBefore, ymlAfter)).toEqual(result);
  expect(getDiff(iniBefore, iniAfter)).toEqual(result);
});
