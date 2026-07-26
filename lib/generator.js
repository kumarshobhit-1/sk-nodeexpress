import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';
import chalk from 'chalk';
import ora from 'ora';
import { execSync } from 'child_process';

const __filename = fileURLToPath ? fileURLToPath(import.meta.url) : path.resolve();
const __dirname = path.dirname(__filename);

export async function generateProject(options) {
  const targetDir = path.resolve(process.cwd(), options.projectName);
  const templateDir = path.resolve(__dirname, '..', 'templates', options.language);

  console.log(`\n📁 Target Directory: ${chalk.cyan(targetDir)}`);

  if (fs.existsSync(targetDir)) {
    const files = fs.readdirSync(targetDir);
    if (files.length > 0) {
      console.log(chalk.red(`\n❌ Error: Directory '${options.projectName}' already exists and is not empty.`));
      process.exit(1);
    }
  } else {
    fs.mkdirpSync(targetDir);
  }

  const spinner = ora('Scaffolding project structure...').start();

  try {
    // Copy template files
    await fs.copy(templateDir, targetDir);

    // Ensure .gitignore is properly created from gitignore.template
    const gitignoreTemplatePath = path.join(targetDir, 'gitignore.template');
    const gitignorePath = path.join(targetDir, '.gitignore');
    if (fs.existsSync(gitignoreTemplatePath)) {
      await fs.copy(gitignoreTemplatePath, gitignorePath);
      await fs.remove(gitignoreTemplatePath);
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
    const isTs = options.language === 'ts';
    
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
        execSync('npm install', { cwd: targetDir, stdio: 'ignore' });
        installSpinner.succeed(chalk.green('Dependencies installed successfully!'));
      } catch (err) {
        installSpinner.fail(chalk.yellow('npm install failed automatically. You can run "npm install" manually inside the project directory.'));
      }
    }

    // Print Next Steps
    console.log(`\n🎉 ${chalk.bold.green('Success!')} Your Node.js boilerplate project is ready.`);
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
