/* eslint no-underscore-dangle: ["error", { "allow": ["__filename", __dirname] }] */
import path from 'path';
import { fileURLToPath } from 'node:url';
import genDiff from '../src/index.js';
import parsers from '../src/parsers.js';
import { result1 } from '../__fixtures__/results.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getPath = (file) => path.join(__dirname, '../__fixtures__', file);

test('Difference JSON format', () => {
  const JSON1Path = getPath('file1.json');
  const JSON2Path = getPath('file2.json');
  const JSONgenDiff = genDiff(JSON1Path, JSON2Path);
  expect(JSONgenDiff).toEqual(result1);

  const YML1Path = getPath('file1.yml');
  const YML2Path = getPath('file2.yml');
  const YMLgenDiff = genDiff(YML1Path, YML2Path);
  expect(YMLgenDiff).toEqual(result1);

  const YAML1Path = getPath('file1.yaml');
  const YAML2Path = getPath('file2.yaml');
  const YAMLgenDiff = genDiff(YAML1Path, YAML2Path);
  expect(YAMLgenDiff).toEqual(result1);
});

test('Throw errors', () => {
  expect(() => parsers('', undefined)).toThrow(Error);
});
