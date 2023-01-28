/* eslint-disable no-restricted-syntax */
const hasProp = (array, prop) => array.indexOf(prop) >= 0;
let depth = 1;

export default function printDifference(data1, data2) {
  const data1Keys = Object.keys(data1);
  const data2Keys = Object.keys(data2);
  const allKeys = [...data1Keys, ...data2Keys];

  const sortedAllKeys = allKeys.sort();
  const spacesCount = 1;
  const indentSize = depth * spacesCount;
  const indent = ' '.repeat(spacesCount);
  const bracketIndent = (spacesCount - indentSize > 0) ? ' '.repeat(spacesCount - indentSize) : '';
  let result = '{';

  // eslint-disable-next-line guard-for-in
  for (const key in sortedAllKeys) {
    const current = sortedAllKeys[key];

    // если ключи равны и не повторяются
    if (data1[current] === data2[current] && !hasProp(result, `${indent}  ${current}: ${data1[current]}`)) {
      result += `\n${indent}  ${current}: ${data1[current]}`;

    // если ключи не равны
    } else if (data1[current] !== data2[current]) {
      // если есть первый ключ и нет второго
      if (Object.hasOwn(data1, current) && !Object.hasOwn(data2, current)) {
        result += `\n${indent}- ${current}: ${data1[current]}`;

      // если есть первый ключ и второй и не повторяются
      } else if (Object.hasOwn(data1, current)
        && Object.hasOwn(data2, current)
        && !hasProp(result, `${indent}- ${current}: ${data1[current]}`)
        && (typeof data1[current] !== 'object' || typeof data2[current] !== 'object')) {
        result += `\n${indent}- ${current}: ${data1[current]}`;
        result += `\n${indent}+ ${current}: ${data2[current]}`;

      // если нет первого ключа, но есть второй
      } else if (!Object.hasOwn(data1, current)
        && Object.hasOwn(data2, current)) {
        result += `\n${indent}+ ${current}: ${data2[current]}`;

      // если оба объекты
      } else if (typeof data1[current] === 'object' && typeof data2[current] === 'object') {
        result += `,\n${indent}- ${current}: `;
        depth += 1;
        result += printDifference(data1[current], data1[current]);
        depth -= 1;
      }
    }
  }
  depth -= 1;
  // yaml файлы добавляют лишний отступ внизу, хз почему. пока заменил bracketindent на пустое место
  result += `\n${''}}`;
  return result;
}
