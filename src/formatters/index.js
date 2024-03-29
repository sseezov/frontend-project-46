import makePlain from './plain.js';
import makeStylish from './stylish.js';

export default (tree, format) => {
  switch (format) {
    case 'stylish':
      return makeStylish(tree);
    case 'plain':
      return makePlain(tree);
    case 'json':
      return JSON.stringify(tree);
    default:
      throw new Error(`Unknown format '${format}`);
  }
};
