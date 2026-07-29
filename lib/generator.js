import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';
import chalk from 'chalk';
import ora from 'ora';
import { spawn } from 'child_process';
import prompts from 'prompts';

const __filename = fileURLToPath ? fileURLToPath(import.meta.url) : path.resolve();
const __dirname = path.dirname(__filename);

function runCommandAsync(command, args, cwd) {
  return new Promise((resolve, reject) => {
    const cmd = process.platform === 'win32' ? `${command}.cmd` : command;
    const child = spawn(cmd, args, { cwd, stdio: 'ignore', shell: false });
    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command ${command} ${args.join(' ')} failed with exit code ${code}`));
      }
    });
    child.on('error', (err) => reject(err));
  });
}

export async function generateProject(options) {
  const targetDir = path.resolve(process.cwd(), options.projectName);
  const templateDir = path.resolve(__dirname, '..', 'templates', options.language);

  console.log(`\n📁 Target Directory: ${chalk.cyan(targetDir)}`);

  if (fs.existsSync(targetDir)) {
    const files = fs.readdirSync(targetDir);
    if (files.length > 0) {
      if (options.yes) {
        await fs.emptyDir(targetDir);
      } else {
        const response = await prompts({
          type: 'confirm',
          name: 'overwrite',
          message: `Target directory '${options.projectName}' is not empty. Overwrite existing files?`,
          initial: false,
        });

        if (!response.overwrite) {
          console.log(chalk.yellow('\n❌ Operation cancelled. Directory was not modified.'));
          process.exit(0);
        }
        await fs.emptyDir(targetDir);
      }
    }
  } else {
    fs.mkdirpSync(targetDir);
  }

  const spinner = ora('Scaffolding project structure...').start();

  try {
    // Copy template files
    await fs.copy(templateDir, targetDir);

    // Dynamic File Stripping
    const isTs = options.language === 'ts';
    const ext = isTs ? 'ts' : 'js';

    // Handle .gitignore creation
    const gitignoreTemplatePath = path.join(targetDir, 'gitignore.template');
    const gitignorePath = path.join(targetDir, '.gitignore');
    if (fs.existsSync(gitignoreTemplatePath)) {
      await fs.copy(gitignoreTemplatePath, gitignorePath);
      await fs.remove(gitignoreTemplatePath);
    }

    // Strip Auth files if not requested
    if (!options.includeAuth) {
      await fs.remove(path.join(targetDir, `src/controllers/authController.${ext}`));
      await fs.remove(path.join(targetDir, `src/routes/authRoutes.${ext}`));
      await fs.remove(path.join(targetDir, `src/models/User.${ext}`));
      await fs.remove(path.join(targetDir, `src/middlewares/authMiddleware.${ext}`));
      await fs.remove(path.join(targetDir, `src/utils/jwt.${ext}`));
    }

    // Strip DB files if not requested
    if (options.database === 'none') {
      await fs.remove(path.join(targetDir, `src/config/db.${ext}`));
    }

    // Strip Docker files if not requested
    if (!options.includeDocker) {
      await fs.remove(path.join(targetDir, 'Dockerfile'));
      await fs.remove(path.join(targetDir, 'docker-compose.yml'));
    }

    // Write .env from .env.example
    const envExamplePath = path.join(targetDir, '.env.example');
    const envPath = path.join(targetDir, '.env');
    if (fs.existsSync(envExamplePath)) {
      await fs.copy(envExamplePath, envPath);
    }

    // Process README.md
    const readmePath = path.join(targetDir, 'README.md');
    if (fs.existsSync(readmePath)) {
      let readmeContent = await fs.readFile(readmePath, 'utf8');
      readmeContent = readmeContent.replace(/\{\{PROJECT_NAME\}\}/g, options.projectName);
      await fs.writeFile(readmePath, readmeContent);
    }

    // Build dynamic package.json
    const projectPackageJson = {
      name: options.projectName,
      version: '1.0.0',
      description: `Backend Node.js & Express server generated with sk-nodeexpress CLI`,
      main: isTs ? 'dist/server.js' : 'src/server.js',
      type: 'module',
      scripts: isTs
        ? {
            "dev": "tsx watch src/server.ts",
            "build": "tsc",
            "start": "node dist/server.js"
          }
        : {
            "dev": "node --watch src/server.js",
            "start": "node src/server.js"
          },
      dependencies: {
        "express": "^4.19.2",
        "dotenv": "^16.4.5",
        "cors": "^2.8.5",
        "helmet": "^7.1.0",
        "morgan": "^1.10.0",
        "cookie-parser": "^1.4.6",
        "express-rate-limit": "^7.2.0"
      },
      devDependencies: {}
    };

    if (options.database === 'mongodb') {
      projectPackageJson.dependencies["mongoose"] = "^8.3.1";
    }

    if (options.includeAuth) {
      projectPackageJson.dependencies["jsonwebtoken"] = "^9.0.2";
      projectPackageJson.dependencies["bcryptjs"] = "^2.4.3";
    }

    if (isTs) {
      projectPackageJson.devDependencies = {
        "typescript": "^5.4.5",
        "tsx": "^4.7.2",
        "@types/node": "^20.12.7",
        "@types/express": "^4.17.21",
        "@types/cors": "^2.8.17",
        "@types/morgan": "^1.9.9",
        "@types/cookie-parser": "^1.4.7"
      };

      if (options.includeAuth) {
        projectPackageJson.devDependencies["@types/jsonwebtoken"] = "^9.0.6";
        projectPackageJson.devDependencies["@types/bcryptjs"] = "^2.4.6";
      }
    }

    await fs.writeJson(path.join(targetDir, 'package.json'), projectPackageJson, { spaces: 2 });

    spinner.succeed(chalk.green('Boilerplate project files scaffolded successfully!'));

    if (options.autoInstall) {
      const installSpinner = ora('Installing npm dependencies (this may take a few seconds)...').start();
      try {
        await runCommandAsync('npm', ['install'], targetDir);
        installSpinner.succeed(chalk.green('Dependencies installed successfully!'));
      } catch (err) {
        installSpinner.fail(chalk.yellow('npm install failed automatically. You can run "npm install" manually inside the project directory.'));
      }
    }

    // Print Next Steps
    console.log(`\n🎉 ${chalk.bold.green('Success!')} Your Express boilerplate project is ready.`);
    console.log(`\n👉 ${chalk.bold('Next steps:')}`);
    console.log(`  ${chalk.cyan(`cd ${options.projectName}`)}`);
    if (!options.autoInstall) {
      console.log(`  ${chalk.cyan('npm install')}`);
    }
    console.log(`  ${chalk.cyan('npm run dev')}\n`);
    console.log(`🔥 Happy coding with ${chalk.bold('sk-nodeexpress')}! 🚀\n`);
  } catch (error) {
    spinner.fail(chalk.red('Failed to scaffold project.'));
    console.error(error);
    process.exit(1);
  }
}
