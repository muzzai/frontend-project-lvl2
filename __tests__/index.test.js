import gendiff from '../src';

const result = '\n- timeout: 50\n+ timeout: 20\n+ verbose: true\n  host: hexlet.io\n- proxy: 123.234.53.22\n- follow: false';

test('gendiff', () => {
  expect(gendiff('__tests__/fixtures/before.json', '__tests__/fixtures/after.json')).toEqual(result);
});
