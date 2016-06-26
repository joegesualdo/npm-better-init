import chalk from 'chalk';
import GitHubApi from 'github';
import log from '@joegesualdo/terminal-log';
const github = new GitHubApi();

export default function createGithubRepo(name, opts) {
  return new Promise((resolve, reject) => {
    console.log(`${chalk.yellow('Creating Github repository')}`);
    opts = opts || {};
    if (!name) {
      log.error('Error creating repo: name was not provided');
      reject();
    }
    if (!opts.token) {
      log.error('Error creating repo: oauth token was not provided');
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
        log.error(`Error creating repo: ${error}`);
        reject();
      }
      log.success(`Successfully created repo: ${name}`);
      resolve();
    });
  });
}
