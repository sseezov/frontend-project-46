const { Command } = require('commander');

const program = new Command();
const compareDatas = require('./src/tools.js');

program
  .name('gendiff')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .description('CLI to some JavaScript string utilities')
  .version('0.8.0')
  .option('-f, --format <type>', 'output format')
  .action(compareDatas);

program.parse();
