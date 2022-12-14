/* eslint-disable quotes */
// const { expect, test } = require('@jest/globals');
const fs = require('fs');
const getData = require('./parsers.js')

function compareKeys(obj1, obj2) {
  const obj1Keys = Object.keys(obj1).sort();
  const obj2Keys = Object.keys(obj2).sort();
  const keysList = obj1Keys.concat(obj2Keys).sort();
  const result = {};

  for (let i = 0; i < keysList.length; i += 1) {
    if (obj1Keys.indexOf(keysList[i]) >= 0 && obj2Keys.indexOf(keysList[i]) >= 0) {
      // eslint-disable-next-line no-unused-expressions
      obj1[keysList[i]] === obj2[keysList[i]] ? result['  '.concat(keysList[i])] = obj1[keysList[i]]
        : (result['- '.concat(keysList[i])] = obj1[keysList[i]],
        result['+ '.concat(keysList[i])] = obj2[keysList[i]]);
    } else if (obj1Keys.indexOf(keysList[i]) >= 0 && obj2Keys.indexOf(keysList[i]) < 0) {
      result['- '.concat(keysList[i])] = obj1[keysList[i]];
    } else if (obj1Keys.indexOf(keysList[i]) < 0 && obj2Keys.indexOf(keysList[i]) >= 0) {
      result['+ '.concat(keysList[i])] = obj2[keysList[i]];
    }
  }

  return result;
}

function compareDatas(file1, file2) {
  const [file1Data, file2Data] = getData(file1, file2);
  return compareKeys(file1Data, file2Data);
}

// const result = {
//   common: {
//       "+ follow": false,
//       "setting1": 'Value 1',
//       "- setting2": 200,
//       - setting3: true,
//       + setting3: null,
//       + setting4: blah blah,
//       + setting5: {
//     key5: value5,
//   }
// setting6: {
//   doge: {
//     - wow:,
//     + wow: so much,
//   }
//   key: value,
//     + ops: vops,
// }
//     }
// group1: {
//   - baz: bas,
//     + baz: bars,
//   foo: bar,
//     - nest: {
//     key: value,
//   }
//   + nest: str,
// }
// - group2: {
//   abc: 12345,
//   deep: {
//     id: 45,
//   }
// }
// + group3: {
//   deep: {
//     id: {
//       number: 45,
//     }
//   }
//   fee: 100500,
// }
// }

// test('compare 2 files', () => {
//   expect(compareDatas('./__fixtures__/file1.json', './__fixtures__/file2.json')).toEqual(result);
// });

console.log(compareDatas('./__fixtures__/file1.json', './__fixtures__/file2.json'))