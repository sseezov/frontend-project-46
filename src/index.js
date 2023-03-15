import { readFileSync } from 'node:fs';
import { cwd } from 'node:process';
import _ from 'lodash'
import path from 'node:path';

export default function showDiff(filepath1, filepath2) {
  const path1 = resolvePath(filepath1)
  const path2 = resolvePath(filepath2)
  const data1 = readFileSync(path1, 'utf-8')
  const data2 = readFileSync(path2, 'utf-8')

  const parsedObj1 = JSON.parse(data1)
  const parsedObj2 = JSON.parse(data2)

  generateDiff(parsedObj1, parsedObj2)
}

function resolvePath(filepath){
  return filepath.includes('fixtures')
  ? filepath
  : `${path.resolve()}\\__fixtures__\\${filepath}`
}

function generateDiff(obj1, obj2) {
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  const sortedKeys = _.union(keys1, keys2).sort()

  const result = ['{'];
  for (let key of sortedKeys) {
    if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) {
      result.push(`  - ${key}: ${obj1[key]}`)
    } else if (!Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      result.push(`  + ${key}: ${obj2[key]}`)
    } else if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      if (obj1[key] === obj2[key]){
        result.push(`    ${key}: ${obj2[key]}`)
      } else if (obj1[key] !== obj2[key]){
        result.push(`  - ${key}: ${obj1[key]}`)
        result.push(`  + ${key}: ${obj2[key]}`)
      }
    }
  }
  result.push('}')
  console.log(result.join('\n'))
}
