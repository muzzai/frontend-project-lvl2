#!/usr/bin/env node
import program from 'commander';
import { gendiff } from '..';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig>, <secondConfig>')
  .option('-f, --format [type]', 'output format', 'tree')
  .action((firstConfigPath, secondConfigPath) => {
    console.log(gendiff(firstConfigPath, secondConfigPath, program.format));
  });
program.parse(process.argv);
