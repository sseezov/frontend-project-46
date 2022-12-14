import fs from 'fs';

function getData(file1, file2) {
  const file1Data = JSON.parse(fs.readFileSync(file1, 'utf-8'));
  const file2Data = JSON.parse(fs.readFileSync(file2, 'utf-8'));
  return [file1Data, file2Data];
}

module.exports = getData;