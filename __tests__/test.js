import path from 'path';
import { readFileSync } from 'node:fs';
import result from '../__fixtures__/result.js';
import printDifference from '../src/makeDiff.js';

const getAbslPath = (fileName) => path.resolve(process.cwd(), fileName);

test('Difference JSON format', () => {
  const file1Path = getAbslPath('__fixtures__/file1.json');
  const file1Data = readFileSync(file1Path, 'utf-8');
  const parsedData1 = JSON.parse(file1Data);

  const file2Path = getAbslPath('__fixtures__/file2.json');
  const file2Data = readFileSync(file2Path, 'utf-8');
  const parsedData2 = JSON.parse(file2Data);

  expect(printDifference(parsedData1, parsedData2)).toEqual(result);
});
