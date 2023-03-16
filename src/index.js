import _ from 'lodash';
import path from 'node:path';
import parser from './parsers.js';

const resolvePath = (filepath) => path.resolve(process.cwd(), filepath);

function generateDiff(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const sortedKeys = _.union(keys1, keys2).sort();

  const result = ['{'];
  // eslint-disable-next-line no-restricted-syntax
  for (const key of sortedKeys) {
    if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) {
      result.push(`  - ${key}: ${obj1[key]}`);
    } else if (!Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      result.push(`  + ${key}: ${obj2[key]}`);
    } else if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      if (obj1[key] === obj2[key]) {
        result.push(`    ${key}: ${obj2[key]}`);
      } else if (obj1[key] !== obj2[key]) {
        result.push(`  - ${key}: ${obj1[key]}`);
        result.push(`  + ${key}: ${obj2[key]}`);
      }
    }
  }
  result.push('}');
  return result.join('\n');
}

export default function showDiff(filepath1, filepath2) {
  const path1 = resolvePath(filepath1);
  const path2 = resolvePath(filepath2);

  const data1 = parser(path1);
  const data2 = parser(path2);

  return generateDiff(data1, data2);
}
