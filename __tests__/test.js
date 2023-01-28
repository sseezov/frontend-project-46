import path from 'path';
import { readFileSync } from 'node:fs';
import result from '../__fixtures__/result.js';
import printDifference from '../src/makeDiff.js';
import genDiff from '../src/index.js';

test('Difference formats', () => {
  const file1JSON = './__fixtures__/file1.json';
  const file1YML = './__fixtures__/file1.yml';
  const file1YAML = './__fixtures__/file1.yaml';

  const file2JSON = './__fixtures__/file2.json';
  const file2YML = './__fixtures__/file2.yml';
  const file2YAML = './__fixtures__/file2.yaml';

  expect(genDiff(file1JSON, file2JSON)).toEqual(result);
  expect(genDiff(file1YML, file2YML)).toEqual(result);
  expect(genDiff(file1YAML, file2YAML)).toEqual(result);
});
