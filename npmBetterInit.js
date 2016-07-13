import jsonfile from 'jsonfile';

import createGit from './createGit.js';
import getQuestions from './get-questions';
import createReadme from './create-readme';
import addGitRemote from './addGitRemote.js';
import createMainFile from './create-main-file';
import createTravisFile from './create-travis-file';
import createAvaTestFile from './createAvaTestFile';
import createTravisProj from './createTravisProj.js';
import createGithubRepo from './createGithubRepo.js';
import createGitignoreFile from './create-gitignore-file';
import installDependencies from './installDependencies.js';
import createBabelrcFile from './createBabelrc.js';
import createMainCssFile from './createMainCssFile.js';
import MultiPrompt from '@joegesualdo/multi-prompt-node'

export default function npmBetterInit(projectName, projectDirectory, isCli, isReact, shouldCreateGithubRepo, opts = {}) {
  opts.github = opts.github || {}
  generatePackageString({
    projectName: projectName,
    projectDirectory: projectDirectory,
    isCli: isCli,
    isReact: isReact,
    githubUsername: opts.github.username,
  })
  .then((pkg) => {
    const packageFilePath = `${process.cwd()}/package.json`;
    jsonfile.writeFile(packageFilePath, pkg, { spaces: 2 }, (err) => {
    });

    const repoName = pkg.repository.split('/').pop();

    createTravisFile()
    .then(
      createMainFile.bind(this, { cli: isCli, isReact: isReact })
    ).then(
      createGitignoreFile
    ).then(
      createAvaTestFile.bind(this, pkg, {isReact: isReact})
    ).then(
      createReadme.bind(this, 'npm', {
        cli: isCli,
        react: isReact,
        repo: pkg.repository,
        projectName: pkg.name,
        description: pkg.description,
        moduleName: pkg.name,
        author: {
          name: pkg.author.name,
        },
      })
    ).then(() => {
      return new Promise((resolve, reject) => {
        if (!isReact) {
          resolve();
        } else {
          createBabelrcFile()
          .then(createMainCssFile)
          .then(resolve)
          .catch((e) => {
            console.log(e)
          })
        }
      })
    }).then(
      createGit.bind(this, projectDirectory)
    ).then(() => {
      return new Promise((resolve, reject) => {
        if (!shouldCreateGithubRepo) {
          resolve();
        } else {
          createGithubRepo(projectName, {
            username: opts.github.username,
            token: opts.github.token,
          })
          .then(
            addGitRemote.bind(this, opts.github.username, repoName)
          ).then(
            createTravisProj.bind(this, opts.github.username, repoName)
          )
          .then(
            resolve
          ).catch((e) => {
            console.log(e)
          });
        }
      });
    }).then(
      installDependencies
    ).catch((e) => {
      throw new Error(e);
    });
  });
}

function generatePackageString({
  projectName,
  projectDirectory,
  isCli,
  isReact,
  githubUsername,
} = {}) {
  return new Promise((resolve, reject) => {
    const questions = getQuestions(githubUsername, projectName, isCli, isReact)

    process.stdout.write('\n')
    new MultiPrompt(questions)
    .begin()
    .then((results) => {
      process.stdout.write('\n')
      let pkg = {}
      pkg.name = results.moduleName.answer
      pkg.version  = results.version.answer
      pkg.description = results.description.answer
      pkg.repository = results.githubRepoName.answer
      pkg.main = results.entry.answer
      pkg.scripts = {};
      pkg.scripts.test = results.testCommand.answer
      pkg.keywords = results.keywords.answer
      pkg.author = {};
      pkg.author.name = results.authorName.answer;
      pkg.author.email = results.authorEmail.answer;
      pkg.author.url = results.authorUrl.answer;
      pkg.license = results.license.answer;
      pkg.devDependencies = results.devDependencies.answer;
      pkg.dependencies = results.dependencies.answer;
      pkg.scripts = {}
      pkg.scripts.prepublish = 'npm run build';
      // build command
      if (isCli) {
        pkg.scripts.build = './node_modules/distify-cli/cli.js --input-file=./cli.js --output-dir=./dist --is-node --is-cli';
      } else if (isReact) {
        pkg.scripts.build = './node_modules/distify-cli/cli.js --input-file=./index.jsx --output-dir=./dist --is-react --is-module';
        pkg.ava = {
          require: ['babel-register'],
          babel: 'inherit',
        };
      } else {
        pkg.scripts.build = './node_modules/distify-cli/cli.js --input-file=./index.js --output-dir=./dist --is-node';
      }
      resolve(pkg)
    })
  })

}
