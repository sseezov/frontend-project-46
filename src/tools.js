const fs = require('fs');
const { Command } = require('commander');
const { getData } = require('../parsers.js')


function compareKeys(obj1, obj2) {
  const obj1Keys = Object.keys(obj1).sort();
  const obj2Keys = Object.keys(obj2).sort();
  const keysList = obj1Keys.concat(obj2Keys).sort();
  const result = {};

  for (let i = 0; i < keysList.length; i++) {
    if (obj1Keys.indexOf(keysList[i]) >= 0 && obj2Keys.indexOf(keysList[i]) >= 0) {
      obj1[keysList[i]] === obj2[keysList[i]] ? result['  '.concat(keysList[i])] = obj1[keysList[i]]
        : (result['- '.concat(keysList[i])] = obj1[keysList[i]],
        result['+ '.concat(keysList[i])] = obj2[keysList[i]]);
    } else if (obj1Keys.indexOf(keysList[i]) >= 0 && obj2Keys.indexOf(keysList[i]) < 0) {
      result['- '.concat(keysList[i])] = obj1[keysList[i]];
    } else if (obj1Keys.indexOf(keysList[i]) < 0 && obj2Keys.indexOf(keysList[i]) >= 0) {
      result['+ '.concat(keysList[i])] = obj2[keysList[i]];
    }
  }

  console.log(result);
  return result;
}

function compareDatas(file1, file2) {
  const [file1Data, file2Data] = getData(file1, file2);
  compareKeys(file1Data, file2Data);
}

module.exports = compareDatas;
