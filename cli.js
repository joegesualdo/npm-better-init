// 3rd party dependencies
import fs from 'fs'
import path from 'path'
import pify from 'pify';
import chalk from 'chalk';
import mkdirp from 'mkdirp';
import dotenv from 'dotenv';
import parseArgs from 'parse-argv';

// Imports
import npmBetterInit from './npmBetterInit.js';
import getFileNameFromPath from './getFileNameFromPath.js';
import configureNpmBetterInit from './configureNpmBetterInit.js';

// dotevn configuration ======
let envFilePath = '';
if (path.resolve(__dirname).split('/').pop() === 'dist') {
  envFilePath = path.resolve(`${__dirname}/../.env`);
} else {
  envFilePath = path.resolve(`${__dirname}/.env`);
}
dotenv.config({ // This actually loads the .env variables into the ENV
path: envFilePath,
  silent: true,
});

// Parse command line options
const args = process.argv.slice(2);
const argv = parseArgs(args, {
  usage: '$ npm-better-init <input>',
  options: [
    {
      flag: 'github',
      alias: 'g',
      description: 'Create github repo'
    },
    {
      flag: 'github-token',
      alias: 't',
      description: 'Adds github token (must be used with config: $ config --github-token)'
    },
    {
      flag: 'github-username',
      alias: 'u',
      description: 'Adds github username (must be used with config: $ config --github-username)'
    },
  ],
  examples: [
    {
      usage: '$ npm-better-init tmp/app -g',
      output: ''
    }
  ]
});

// // Set variables
// if (argv['help'] || argv['h']) {
//   argv.help()
//   process.exit()
// }
const isCli = argv['type'] === 'cli';
const isConfig = args[0] === 'config';
const shouldCreateGithubRepo = argv['g'] ? true : false;
const isProjectPathProvided = (argv['_'] && argv['_'][0]);
// Get's absolute path of project, if user picked one.
const providedProjectPath = isProjectPathProvided ? `${process.cwd()}/${argv['_'][0]}` : undefined;
const projectPath = providedProjectPath || process.cwd();
const projectName = getFileNameFromPath(projectPath);

// $ npm-better-init config
if (isConfig) {
  configureNpmBetterInit(args)
  .then(() => {
    process.exit();
  })
} else {
  if (providedProjectPath) {
    pify(mkdirp)(projectPath)
    .then(() => {
      process.chdir(projectPath);
      npmBetterInit(projectName, projectPath, isCli, shouldCreateGithubRepo, {
        github: {
          token: process.env['GITHUB_TOKEN'],
          username: process.env['GITHUB_USERNAME'],
        },
      });
    })
    .catch((err) => {
      console.log(`${chalk.red('✖')} There was an error with the project path specified: ${err}`);
      process.exit();
    });
  } else {
    npmBetterInit(projectName, projectPath, isCli, shouldCreateGithubRepo, {
      github: {
        token: process.env['GITHUB_TOKEN'],
        username: process.env['GITHUB_USERNAME'],
      },
    });
  }
}


