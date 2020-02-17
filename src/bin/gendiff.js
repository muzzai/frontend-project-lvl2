#!/usr/bin/env node
import program from 'commander';
import printDiff from '..';

const formats = ['tree', 'plain', 'json'];
program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig>, <secondConfig>')
  .option('-f, --format [type]', 'output format', 'tree')
  .action((firstConfigPath, secondConfigPath) => {
    const output = formats.includes(program.format)
      ? printDiff(firstConfigPath, secondConfigPath, program.format)
      : `\n'${program.format}' is invalid output format. Valid formats are: 'tree', 'plain', 'json'.`;
    console.log(output);
  });
program.parse(process.argv);
