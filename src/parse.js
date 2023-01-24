import { load as YMLParse } from 'js-yaml';

const parse = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.stringify(data);
    case 'yaml':
    case 'yml':
      return YMLParse(data);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

export default parse;
