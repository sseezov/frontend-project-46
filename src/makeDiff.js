/* eslint-disable no-restricted-syntax */
const hasProp = (array, prop) => array.indexOf(prop) >= 0;
let depth = 1;

export default function printDifference(data1, data2) {
  const data1Keys = Object.keys(data1);
  const data2Keys = Object.keys(data2);
  const allKeys = [...data1Keys, ...data2Keys];

  const sortedAllKeys = allKeys.sort();
  let result = '{';
  const spacesCount = 1;
  const indentSize = depth * spacesCount;
  const indent = ' '.repeat(spacesCount);
  const bracketIndent = ' '.repeat(indentSize - spacesCount);

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
        result += printDifference(data1[current], data1[current]);
        depth -= 1;
      }
    }
  }
  depth -= 1;
  result += `\n${bracketIndent}}`;
  return result;
}
