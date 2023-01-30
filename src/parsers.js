// eslint-disable-next-line import/no-extraneous-dependencies
import { load as YMLParse } from 'js-yaml';
import { getData, getFormat } from './utils.js';

const parser = (file) => {
  const data = getData(file);
  const extension = getFormat(file);

  if (extension === 'yaml' || extension === 'yml') {
    return YMLParse(data);
  }
  return JSON.parse(data);
};

export default parser;
