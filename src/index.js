/* eslint-disable no-restricted-syntax */
import fs from 'fs';
import path from 'node:path';
import getDifferenceTree from './getDiffTree.js';
import parse from './parse.js';

const getAbsolutePath = (fileName) => path.resolve(process.cwd(), fileName);

const getData = (filepath) => {
  const absolutePath = getAbsolutePath(filepath);
  const formatName = path.extname(absolutePath).slice(1);
  const readFile = fs.readFileSync(absolutePath, 'utf-8');
  const parsedData = parse(readFile, formatName);
  return parsedData;
};

const genDiff = (filepath1, filepath2) => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const differenceTree = getDifferenceTree(data1, data2);
  const result = JSON.stringify(differenceTree);
  return result;
};

export default genDiff;
