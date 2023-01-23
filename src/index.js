/* eslint-disable no-restricted-syntax */
import path from 'node:path';
import { readFileSync } from 'node:fs';
import parseData from './parsers.js';

const getAbslPath = (fileName) => path.resolve(process.cwd(), fileName);
const hasProp = (array, prop) => array.indexOf(prop) >= 0;
let depth = 1;

const getDataDifferences = (data1, data2) => {
  const data1Keys = Object.keys(data1);
  const data2Keys = Object.keys(data2);
  const allKeys = [...data1Keys, ...data2Keys];
  const sortedAllKeys = allKeys.sort();
  let result = '{';
  const indent = '  '.repeat(depth);

  // eslint-disable-next-line guard-for-in
  for (const key in sortedAllKeys) {
    const current = sortedAllKeys[key];

    if (data1[current] === data2[current] && !hasProp(result, `${indent}  ${current}: ${data1[current]}`)) {
      result += `\n${indent}  ${current}: ${data1[current]}`;
    } else if (data1[current] !== data2[current]) {
      if (Object.hasOwn(data1, current) && !Object.hasOwn(data2, current)) {
        result += `\n${indent}- ${current}: ${data1[current]}`;
      } else if (Object.hasOwn(data1, current)
      && Object.hasOwn(data2, current)
        && !hasProp(result, `${indent}- ${current}: ${data1[current]}`)
        && (typeof data1[current] !== 'object' || typeof data2[current] !== 'object')) {
        result += `\n${indent}- ${current}: ${data1[current]}`;
        result += `\n${indent}+ ${current}: ${data2[current]}`;
      } else if (!Object.hasOwn(data1, current)
      && Object.hasOwn(data2, current)) {
        result += `\n${indent}+ ${current}: ${data2[current]}`;
      } else if (typeof data1[current] === 'object' && typeof data2[current] === 'object') {
        result += `,\n${indent}- ${current}: `;
        depth += 1;
        result += getDataDifferences(data1[current], data1[current]);
        depth -= 1;
      }
    }
  }
  depth -= 1;
  result += `\n${indent}}`;
  return result;
};

export default function genDiff(file1Name, file2Name) {
  const file1Path = getAbslPath(file1Name);
  const file1Data = readFileSync(file1Path, 'utf-8');
  const file1Format = path.extname(file1Path).slice(1);
  const file1ParsedData = parseData(file1Data, file1Format);

  const file2Path = getAbslPath(file2Name);
  const file2Data = readFileSync(file2Path, 'utf-8');
  const file2Format = path.extname(file2Path).slice(1);
  const file2ParsedData = parseData(file2Data, file2Format);

  const filesDifferences = getDataDifferences(file1ParsedData, file2ParsedData);
  return filesDifferences;
}
