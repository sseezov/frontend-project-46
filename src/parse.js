import { load } from 'js-yaml';

const parse = (content, formatName = 'json') => {
  switch (formatName) {
    case 'json':
      return JSON.parse(content);
    case 'yml':
    case 'yaml':
      return load(content);
    default:
      throw new Error('Invalid file format! Try supported formats.');
  }
};

export default parse;
