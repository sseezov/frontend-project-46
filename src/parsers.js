// eslint-disable-next-line import/no-extraneous-dependencies
import { load as YMLParse } from 'js-yaml';
import { getData, getFormat } from './utils.js';

const parser = (file) => {
  const extension = getFormat(file);
  if (extension === 'yaml' || extension === 'yml') {
    return YMLParse(getData(file));
  }

  return JSON.parse(getData(file));
};

export default parser;
