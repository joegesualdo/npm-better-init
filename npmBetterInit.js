import jsonfile from 'jsonfile';

import createGit from './createGit.js';
import getQuestions from './get-questions';
import createReadme from './create-readme';
import askQuestions from './askQuestions.js';
import addGitRemote from './addGitRemote.js';
import createMainFile from './create-main-file';
import createTravisFile from './create-travis-file';
import createAvaTestFile from './createAvaTestFile';
import createTravisProj from './createTravisProj.js';
import createGithubRepo from './createGithubRepo.js';
import createGitignoreFile from './create-gitignore-file';
import installDependencies from './installDependencies.js';

export default function npmBetterInit(projectName, projectDirectory, isCli, shouldCreateGithubRepo, opts) {
  opts = opts || {}
  opts.github = opts.github || {}
  const questions = getQuestions(opts.github.username, projectName, isCli)
  askQuestions(questions)
  .then((pkg) => {
    const packageFilePath = `${process.cwd()}/package.json`;
    if (isCli) {
      pkg['scripts']["build"] = "./node_modules/distify-cli/cli.js --input-file=./cli.js --output-dir=./dist --is-node --is-cli";
    } else {
      pkg['scripts']["build"] = "./node_modules/distify-cli/cli.js --input-file=./index.js --output-dir=./dist --is-node";
    }
    pkg['scripts']["prepublish"] = "npm run build";

    jsonfile.writeFile(packageFilePath, pkg, { spaces: 2 }, (err) => {
    });
    return pkg;
  })
  .then((pkg) => {
    const repoName = pkg.repository.split('/').pop();

    createTravisFile()
    .then(
      createMainFile.bind(this, { cli: isCli })
    ).then(
      createGitignoreFile
    ).then(
      createAvaTestFile.bind(this, pkg)
    ).then(
      installDependencies
    ).then(
      createGit.bind(this, projectDirectory)
    ).then(() => {
      if (shouldCreateGithubRepo) {
        createGithubRepo(pkg.name, {
          token: opts.github.token,
        })
        .then(addGitRemote.bind(this, opts.github.username, repoName))
        .then(createReadme.bind(this, pkg, { cli: isCli }))
        .then(createTravisProj.bind(this, opts.github.username, repoName));
      } else {
        createReadme(pkg, { cli: isCli });
      }
    });
  });
}


