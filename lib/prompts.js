import prompts from 'prompts';

export async function askProjectQuestions(defaultProjectName) {
  const onCancel = () => {
    console.log('\n❌ Operation cancelled by user.');
    process.exit(0);
  };

  const questions = [
    {
      type: defaultProjectName ? null : 'text',
      name: 'projectName',
      message: 'What is your project name?',
      initial: 'my-express-app',
      validate: (value) =>
        /^[a-z0-9-_]+$/i.test(value)
          ? true
          : 'Project name may only contain letters, numbers, hyphens, and underscores.',
    },
    {
      type: 'select',
      name: 'language',
      message: 'Which language variant do you want to use?',
      choices: [
        { title: 'JavaScript (ES Modules)', value: 'js' },
        { title: 'TypeScript', value: 'ts' },
      ],
      initial: 0,
    },
    {
      type: 'select',
      name: 'database',
      message: 'Which database connection do you want to include?',
      choices: [
        { title: 'MongoDB (with Mongoose ORM)', value: 'mongodb' },
        { title: 'None (Standalone Express Server)', value: 'none' },
      ],
      initial: 0,
    },
    {
      type: 'confirm',
      name: 'includeAuth',
      message: 'Include JWT Authentication boilerplate code (Register/Login/Auth middleware)?',
      initial: true,
    },
    {
      type: 'confirm',
      name: 'includeSecurity',
      message: 'Include Security middlewares (Helmet, CORS, Rate Limiting, Morgan logger)?',
      initial: true,
    },
    {
      type: 'confirm',
      name: 'includeDocker',
      message: 'Include Dockerfile & docker-compose.yml setup?',
      initial: true,
    },
    {
      type: 'confirm',
      name: 'autoInstall',
      message: 'Do you want to automatically install npm dependencies after generation?',
      initial: true,
    },
  ];

  const answers = await prompts(questions, { onCancel });

  return {
    projectName: defaultProjectName || answers.projectName || 'my-express-app',
    language: answers.language || 'js',
    database: answers.database || 'mongodb',
    includeAuth: answers.includeAuth ?? true,
    includeSecurity: answers.includeSecurity ?? true,
    includeDocker: answers.includeDocker ?? true,
    autoInstall: answers.autoInstall ?? true,
  };
}
