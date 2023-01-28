import printDifference from './makeDiff.js';
import parser from './parsers.js';
import { getAbslPath } from './utils.js';

const genDiff = (file1Name, file2Name) => {
  const file1Data = getAbslPath(file1Name, 'utf-8');
  const parsedData1 = parser(file1Data);

  const file2Data = getAbslPath(file2Name, 'utf-8');
  const parsedData2 = parser(file2Data);

  return printDifference(parsedData1, parsedData2);
};

export default genDiff;
