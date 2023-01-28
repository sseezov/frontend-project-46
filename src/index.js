import path from 'path';
import { readFileSync } from 'node:fs';
import printDifference from './makeDiff.js';

const getAbslPath = (fileName) => path.resolve(process.cwd(), fileName);

const genDiff = (file1Name, file2Name) => {
  const file1Path = getAbslPath(file1Name);
  const file1Data = readFileSync(file1Path, 'utf-8');
  const parsedData1 = JSON.parse(file1Data);
  // const file1Format = path.extname(file1Path).slice(1);

  const file2Path = getAbslPath(file2Name);
  const file2Data = readFileSync(file2Path, 'utf-8');
  const parsedData2 = JSON.parse(file2Data);
  // const file2Format = path.extname(file2Path).slice(1);

  // const filesDifferences = getDataDifferences(file1ParsedData, file2ParsedData);
  console.log(printDifference(parsedData1, parsedData2));
};

export default genDiff;
