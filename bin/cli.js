#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { askProjectQuestions } from '../lib/prompts.js';
import { generateProject } from '../lib/generator.js';

const program = new Command();

program
  .name('sk-nodeexpress')
  .description('Generate production-ready Node.js & TypeScript Express boilerplate code with Auth & DB')
  .argument('[project-name]', 'Name of the project directory')
  .option('-y, --yes', 'Skip prompts and use default settings (JavaScript + MongoDB + Auth + Docker)')
  .option('-t, --ts', 'Use TypeScript template')
  .option('--js', 'Use JavaScript template')
  .option('--auth', 'Include JWT authentication')
  .option('--no-auth', 'Exclude JWT authentication')
  .option('--db <type>', 'Database type: mongodb or none', 'mongodb')
  .option('--docker', 'Include Dockerfile & docker-compose')
  .option('--no-docker', 'Exclude Docker files')
  .option('--install', 'Automatically install npm dependencies')
  .option('--no-install', 'Skip automatic npm dependency installation')
  .action(async (projectName, options) => {
    try {
      // Print CLI Banner
      console.log(`
 ${chalk.bold.magenta('==============================================')}
 ${chalk.bold.cyan(' 🚀 SK-NODEEXPRESS CLI SCAFFOLDER')}
 ${chalk.bold.yellow(' Ultra-fast Production Node.js & TS Generator')}
 ${chalk.bold.magenta('==============================================')}
`);

      if (options.yes) {
        const config = {
          projectName: projectName || 'my-express-app',
          language: options.ts ? 'ts' : 'js',
          database: options.db || 'mongodb',
          includeAuth: options.auth !== false,
          includeSecurity: true,
          includeDocker: options.docker !== false,
          autoInstall: options.install !== false,
        };
        await generateProject(config);
      } else {
        const userAnswers = await askProjectQuestions(projectName);
        // Override with explicit CLI flags if provided
        if (options.ts) userAnswers.language = 'ts';
        if (options.js) userAnswers.language = 'js';
        if (options.auth === false) userAnswers.includeAuth = false;
        if (options.docker === false) userAnswers.includeDocker = false;
        if (options.install === false) userAnswers.autoInstall = false;

        await generateProject(userAnswers);
      }
    } catch (error) {
      console.error(chalk.red('\n❌ Unexpected Error:'), error);
      process.exit(1);
    }
  });

program.parse(process.argv);
