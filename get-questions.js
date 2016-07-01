import chalk from 'chalk';

export default function getQuestions(username, projectName, isCli, isReact) {
  let questions = [
    {
      identifier: 'moduleName',
      prompt: `${chalk.green('?')} What do you want to name your module? (${projectName})`,
      onEnter: (answer, pkg) => {
        return answer || projectName;
      },
    },
    {
      identifier: 'githubRepoName',
      prompt: `${chalk.green('?')} What do you want to name your github repo? (${username}/<REPO_NAME>)`,
      onEnter: (answer, pkg) => {
        return `${username}/${answer}`;
      },
    },
    {
      identifier: 'version',
      prompt: `${chalk.green('?')} What version is it? (0.0.1)`,
      onEnter: (answer, pkg) => {
       return answer || "0.0.1";
      },
    },
    {
      identifier: 'description',
      prompt: `${chalk.green('?')} What is a description of this module?`,
      onEnter: (answer, pkg) => {
        return answer;
      },
    },
    {
      identifier: 'entry',
      prompt: `${chalk.green('?')} What file should be used for the entry point? (${(isCli ? './dist/cli.js' : './dist/index.js')})`,
      onEnter: (answer, pkg) => {
        let a;
        if (isCli) {
          a = answer || './dist/cli.js';
        } else {
          a = answer || './dist/index.js';
        }
        return a;
      },
    },
    {
      identifier: 'testCommand',
      prompt: `${chalk.green('?')} What is the test command? ($ ${isReact ? 'ava-react test.js' : 'ava test.js'})`,
      onEnter: (answer, pkg) => {
        let defaultCommand = 'npm run build && ./node_modules/ava/cli.js -v test.js'
        if (isReact) {
          defaultCommand = './node_modules/@joegesualdo/ava-react/cli.js test.js'
        }
        return answer || defaultCommand;
      },
    },
    {
      identifier: 'keywords',
      prompt: `${chalk.green('?')} What keywords describe this module?`,
      onEnter: (answer, pkg) => {
        // split and remove empty strings
        return answer.split(',').filter((e) => { return e });
      },
    },
    {
      identifier: 'authorName',
      prompt: `${chalk.green('?')} What's the author's name`,
      onEnter: (answer, pkg) => {
        return answer;
      },
    },
    {
      identifier: 'authorEmail',
      prompt: `${chalk.green('?')} What's the author's email`,
      onEnter: (answer, pkg) => {
        return answer;
      },
    },
    {
      identifier: 'authorUrl',
      prompt: `${chalk.green('?')} What's the author's url?`,
      onEnter: (answer, pkg) => {
        return answer;
      },
    },
    {
      identifier: 'license',
      prompt: `${chalk.green('?')} What license do you want to include? (MIT)`,
      onEnter: (answer, pkg) => {
       return answer || 'MIT';
      },
    },
    {
      identifier: 'devDependencies',
      prompt: `${chalk.green('?')} What are the devDependencies?`,
      onEnter: (answer, pkg) => {
        let devDependencies = {};
        // split and remove empty strings
        answer.split(",").filter((e) => { return e }).forEach((dep) => {
          devDependencies[dep] = '*';
        });
        devDependencies['ava'] = '^0.15.2';
        devDependencies['distify-cli'] = '0.0.10';
        if (isReact) {
          devDependencies['react-addons-test-utils'] = "^15.1.0"
          devDependencies['enzyme'] = "^2.3.0";
          devDependencies['@joegesualdo/ava-react'] = "^0.0.4";
        }
        return devDependencies;
      },
    },
    {
      identifier: 'dependencies',
      prompt: `${chalk.green('?')} What are the dependencies?`,
      onEnter: (answer, pkg) => {
        let dependencies = {};
        // split and remove empty strings
        answer.split(',').filter((e) => { return e }).forEach((dep) => {
          dependencies[dep] = '*';
        });
        if (isReact) {
          dependencies['react'] = "^15.1.0";
          dependencies['react-dom'] = "^15.1.0";
        }
        return dependencies;
      },
    },
  ];

  if (isCli) {
    questions.push(
      {
        identifier: 'executable',
        prompt: `${chalk.green('?')} What do you want the cli exectable to be? (${projectName})`,
        onEnter: (answer, pkg) => {
          let bin = {}
          let name = answer || projectName
          bin[name] = './dist/cli.js';
          return bin;
        },
      },
    );
  }
  return questions;
}

