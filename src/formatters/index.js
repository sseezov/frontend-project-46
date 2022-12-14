import stylish from './stylish-formatter.js';

export default (content, type) => {
  switch (type) {
    case 'stylish':
      return stylish(content);
    default:
      return stylish(content);
  }
};