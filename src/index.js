import { resolve, extname } from 'path';
import { readFileSync } from 'fs';
import parsers from './parse.js';
import buildTree from './buildTree.js';
import format from './formatters/index.js';

const getFormat = (filepath) => extname(filepath).slice(1);

const getFixturePath = (filepath) => resolve(process.cwd(), filepath);

const readFile = (filepath) => readFileSync(getFixturePath(filepath, 'utf-8'));

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const readFile1 = readFile(filepath1);
  const readFile2 = readFile(filepath2);

  const file1 = parsers(readFile1, getFormat(filepath1));
  const file2 = parsers(readFile2, getFormat(filepath2));

  const tree = buildTree(file1, file2);

  return format(tree, formatName);
};

export default genDiff;
