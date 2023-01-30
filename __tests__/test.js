import resultStylish from '../__fixtures__/resultStylish.js';
import genDiff from '../src/index.js';
import resultPlain from '../__fixtures__/resultPlain.js';
import resultJSON from '../__fixtures__/resultJSON.js';

test('stylish YAML test', () => {
  const file1YAML = './__fixtures__/file1.yaml';
  const file2YAML = './__fixtures__/file2.yaml';
  expect(genDiff(file1YAML, file2YAML)).toEqual(resultStylish);
});

test('stylish YML test', () => {
  const file1YML = './__fixtures__/file1.yml';
  const file2YML = './__fixtures__/file2.yml';
  expect(genDiff(file1YML, file2YML)).toEqual(resultStylish);
});

test('stylish JSON test', () => {
  const file1JSON = './__fixtures__/file1.json';
  const file2JSON = './__fixtures__/file2.json';
  expect(genDiff(file1JSON, file2JSON)).toEqual(resultStylish);
});

test('plain YAML test', () => {
  const file1YAML = './__fixtures__/file1.yaml';
  const file2YAML = './__fixtures__/file2.yaml';
  expect(genDiff(file1YAML, file2YAML, 'plain')).toEqual(resultPlain);
});

test('plain YML test', () => {
  const file1YML = './__fixtures__/file1.yml';
  const file2YML = './__fixtures__/file2.yml';
  expect(genDiff(file1YML, file2YML, 'plain')).toEqual(resultPlain);
});

test('plain JSON test', () => {
  const file1JSON = './__fixtures__/file1.json';
  const file2JSON = './__fixtures__/file2.json';
  expect(genDiff(file1JSON, file2JSON, 'plain')).toEqual(resultPlain);
});

test('JSON YAML test', () => {
  const file1YAML = './__fixtures__/file1.yaml';
  const file2YAML = './__fixtures__/file2.yaml';
  expect(genDiff(file1YAML, file2YAML, 'json')).toEqual(resultJSON);
});

test('JSON YML test', () => {
  const file1YML = './__fixtures__/file1.yml';
  const file2YML = './__fixtures__/file2.yml';
  expect(genDiff(file1YML, file2YML, 'json')).toEqual(resultJSON);
});

test('JSON json test', () => {
  const file1json = './__fixtures__/file1.json';
  const file2json = './__fixtures__/file2.json';
  expect(genDiff(file1json, file2json, 'json')).toEqual(resultJSON);
});
