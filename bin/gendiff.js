#!/usr/bin/env node
import { Command } from 'commander';
import showDiff from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .usage('[options] < filepath1 > <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const result = showDiff(filepath1, filepath2, program.opts().format);
    console.log(result);
  });

program.parse();
