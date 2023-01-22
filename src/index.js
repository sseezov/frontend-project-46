import path from 'node:path';
import { readFileSync } from 'node:fs';

const getAbslPath = (fileName) => path.resolve(process.cwd(), fileName);
const hasProp = (array, prop) => array.indexOf(prop)>=0;

const getDataDifferences = (data1, data2) => {
  const data1Keys = Object.keys(data1);
  const data2Keys = Object.keys(data2);
  const allKeys = [...data1Keys, ...data2Keys];
  const sortedAllKeys = allKeys.sort();
  let result = ['{'];

  for (let key in sortedAllKeys){
    if (data1[sortedAllKeys[key]] === data2[sortedAllKeys[key]] && !hasProp(result, `    ${sortedAllKeys[key]}: ${data1[sortedAllKeys[key]]}`)){
      result.push(`\n`)
      result.push(`    ${sortedAllKeys[key]}: ${data1[sortedAllKeys[key]]}`)
    }
    else if (data1[sortedAllKeys[key]] !== data2[sortedAllKeys[key]]){
      if (Object.hasOwn(data1, sortedAllKeys[key]) && !Object.hasOwn(data2, sortedAllKeys[key])){
        result.push(`\n`)
        result.push(`  - ${sortedAllKeys[key]}: ${data1[sortedAllKeys[key]]}`)
      }
      else if (Object.hasOwn(data1, sortedAllKeys[key]) && Object.hasOwn(data2, sortedAllKeys[key])
        && !hasProp(result, `  - ${sortedAllKeys[key]}: ${data1[sortedAllKeys[key]]}`)){
        result.push(`\n`)
        result.push(`  - ${sortedAllKeys[key]}: ${data1[sortedAllKeys[key]]}`)
        result.push(`\n`)
        result.push(`  + ${sortedAllKeys[key]}: ${data2[sortedAllKeys[key]]}`)
      }
      else if (!Object.hasOwn(data1, sortedAllKeys[key]) && Object.hasOwn(data2, sortedAllKeys[key])){
        result.push(`\n`)
        result.push(`  + ${sortedAllKeys[key]}: ${data2[sortedAllKeys[key]]}`)
      }
    }
  }
  result.push('\n' + '}');
  return result.join('');
};

export const genDiff = (file1Name, file2Name) => {
  const file1Path = getAbslPath(file1Name);
  const file1Data = readFileSync(file1Path, 'utf-8');
  const file1ParsedData = JSON.parse(file1Data);

  const file2Path = getAbslPath(file2Name);
  const file2Data = readFileSync(file2Path, 'utf-8');
  const file2ParsedData = JSON.parse(file2Data);

  const filesDifferences = getDataDifferences(file1ParsedData, file2ParsedData);
  return filesDifferences;
};