#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { askProjectQuestions } from '../lib/prompts.js';
import { generateProject } from '../lib/generator.js';

const program = new Command();

console.log(`
 ${chalk.bold.magenta('==============================================')}
 ${chalk.bold.cyan(' 🚀 SK-NODEEXPRESS CLI SCAFFOLDER')}
 ${chalk.bold.yellow(' Ultra-fast Production Node.js & TS Generator')}
 ${chalk.bold.magenta('==============================================')}
`);

program
  .name('sk-nodeexpress')
  .description('Generate production-ready Node.js & TypeScript Express boilerplate code with Auth & DB')
  .argument('[project-name]', 'Name of the project directory')
  .option('-y, --yes', 'Skip prompts and use default settings (JavaScript + MongoDB + Auth)')
  .option('-t, --ts', 'Use TypeScript template')
  .action(async (projectName, options) => {
    try {
      if (options.yes) {
        const config = {
          projectName: projectName || 'my-express-app',
          language: options.ts ? 'ts' : 'js',
          database: 'mongodb',
          includeAuth: true,
          includeSecurity: true,
          autoInstall: true,
        };
        await generateProject(config);
      } else {
        const userAnswers = await askProjectQuestions(projectName);
        await generateProject(userAnswers);
      }
    } catch (error) {
      console.error(chalk.red('\n❌ Unexpected Error:'), error);
      process.exit(1);
    }
  });

program.parse(process.argv);
