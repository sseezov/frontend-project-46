const { Command } = require('commander');
const program = new Command();

program
  .name('gendiff')
  .description('CLI to some JavaScript string utilities')
  .version('0.8.0');

program;

program.parse();