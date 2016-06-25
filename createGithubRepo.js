import chalk from 'chalk';
import GitHubApi from 'github';
const github = new GitHubApi();

export default function createGithubRepo(name, opts) {
  return new Promise((resolve, reject) => {
    console.log(`${chalk.yellow('Creating Github repository')}`);
    opts = opts || {};
    if (!name) {
      console.log(`${chalk.red('✖')} Error creating repo: name was not provided`);
      reject();
    }
    if (!opts.token) {
      console.log(`${chalk.red('✖')} Error creating repo: oauth token was not provided`);
      reject();
    }

    github.authenticate({
      type: 'oauth',
      token: opts.token,
    });

    github.repos.create({
      name,
    }, (error, res) => {
      if (error) {
        console.log(`${chalk.red('✖')} Error creating repo: ${error}`);
        reject();
      }
      console.log(`${chalk.green('✔')} Successfully created repo: ${name}`);
      resolve();
    });
  });
}
