import chalk from 'chalk';

export default function getQuestions(username, projectName, isCli) {
  let questions = [
    {
      prompt: `${chalk.green('?')} What do you want to name your module? (${projectName})`,
      onEnter: (answer, pkg) => {
        pkg.name = answer || projectName;
        return pkg;
      },
    },
    {
      prompt: `${chalk.green('?')} What version is it? (0.0.1)`,
      onEnter: (answer, pkg) => {
        pkg.version = answer || "0.0.1";
        return pkg;
      },
    },
    {
      prompt: `${chalk.green('?')} What is a description of this module?`,
      onEnter: (answer, pkg) => {
        pkg.description = answer;
        return pkg;
      },
    },
    {
      prompt: `${chalk.green('?')} What file should be used for the entry point? (${(isCli ? './dist/cli.js' : './dist/index.js')})`,
      onEnter: (answer, pkg) => {
        if (isCli) {
          pkg.main = answer || './dist/cli.js';
        } else {
          pkg.main = answer || './dist/index.js';
        }
        return pkg;
      },
    },
    {
      prompt: `${chalk.green('?')} What is the test command? ($ ava test.js)`,
      onEnter: (answer, pkg) => {
        pkg['scripts'] = {
          test: answer || './node_modules/ava/cli.js -v test.js',
        };
        return pkg;
      },
    },
    {
      prompt: `${chalk.green('?')} What do you want to name your github repo? (${username}/<REPO_NAME>)`,
      onEnter: (answer, pkg) => {
        pkg.repository = `${username}/${answer}`;
        return pkg;
      },
    },
    {
      prompt: `${chalk.green('?')} What keywords describe this module?`,
      onEnter: (answer, pkg) => {
        // split and remove empty strings
        pkg.keywords = answer.split(',').filter((e) => { return e });
        return pkg;
      },
    },
    {
      prompt: `${chalk.green('?')} What's the author's name`,
      onEnter: (answer, pkg) => {
        pkg.author = {
          name: answer
        };
        return pkg;
      },
    },
    {
      prompt: `${chalk.green('?')} What license do you want to include? (MIT)`,
      onEnter: (answer, pkg) => {
        pkg.license = answer || 'MIT';
        return pkg;
      },
    },
    {
      prompt: `${chalk.green('?')} What are the devDependencies?`,
      onEnter: (answer, pkg) => {
        pkg.devDependencies = {};
        // split and remove empty strings
        answer.split(",").filter((e) => { return e }).forEach((dep) => {
          pkg.devDependencies[dep] = '*';
        });
        pkg.devDependencies['ava'] = '^0.15.2';
        pkg.devDependencies['distify-cli'] = '0.0.8';
        return pkg;
      },
    },
    {
      prompt: `${chalk.green('?')} What are the dependencies?`,
      onEnter: (answer, pkg) => {
        pkg.dependencies = {};
        // split and remove empty strings
        answer.split(',').filter((e) => { return e }).forEach((dep) => {
          pkg.dependencies[dep] = '*';
        });
        return pkg;
      },
    },
  ];

  if (isCli) {
    questions.push(
      {
        prompt: `${chalk.green('?')} What do you want the cli exectable to be? (${projectName})`,
        onEnter: (answer, pkg) => {
          const name = answer || projectName
          pkg['bin'] = {};
          pkg['bin'][name] = './dist/cli.js';
          return pkg;
        },
      },
    );
  }
  return questions;
}

