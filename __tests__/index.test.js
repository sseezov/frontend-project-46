import result from '../__fixtures__/result.js';
import showDiff from '../src/index.js';

test('gendiff', () => {
  expect(showDiff('./__fixtures__/file1.json', './__fixtures__/file2.json')).toBe(result);
});
