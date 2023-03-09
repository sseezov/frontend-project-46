import parser from './parsers.js';
import { getAbslPath } from './utils.js';
import buildDifference from './buildAST.js';
import makeDiff from './formatters/index.js';

const genDiff = (file1Name, file2Name, formatName = 'stylish') => {
  const file1Data = getAbslPath(file1Name, 'utf-8');
  const parsedData1 = parser(file1Data);

  const file2Data = getAbslPath(file2Name, 'utf-8');
  const parsedData2 = parser(file2Data);

  const ast = buildDifference(parsedData1, parsedData2);
  return makeDiff(ast, formatName);
};

export default genDiff;
