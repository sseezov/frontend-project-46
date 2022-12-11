/* eslint-disable quotes */
const { expect, test } = require('@jest/globals');
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

const result = {
  "  host": "hexlet.io",
  "+ follow": false,
  "+ proxy": "123.234.53.22",
  "+ timeout": 50,
  "- timeout": 20,
  "- verbose": true,
};

test('compare 2 files', () => {
  expect(compareDatas('./__fixtures__/file1.json', './__fixtures__/file2.json')).toEqual(result);
});
