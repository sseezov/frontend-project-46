import path from 'path';
import { readFileSync } from 'node:fs';

const getAbslPath = (fileName) => path.resolve(process.cwd(), fileName);

const getData = (file) => readFileSync(getAbslPath(file), 'utf-8');

const getFormat = (file) => path.extname(file).slice(1);

export { getAbslPath, getData, getFormat };
