import path from 'node:path';
import parse from './parse.js';
import getDifferenceTree from './buildTree.js';

export default function genDiff(filepath1, filepath2) {
  const data1 = parse(path.resolve(filepath1));
  const data2 = parse(path.resolve(filepath2));

  return getDifferenceTree(data1, data2);
}


