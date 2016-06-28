import chalk from 'chalk';
import GitHubApi from 'github';
import log from '@joegesualdo/terminal-log';
import indentString from '@joegesualdo/indent-string';

const github = new GitHubApi();

export default function createGithubRepo(name, opts) {
  return new Promise((resolve, reject) => {
    console.log(indentString(`${chalk.yellow('Creating Github repository')}`, 2));
    opts = opts || {};
    if (!name) {
      log.error('Error creating repo: name was not provided', 2);
      reject();
    }
    if (!opts.token) {
      log.error('Error creating repo: oauth token was not provided', 2);
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
        log.error(`Error creating repo: ${error}`, 2);
        reject();
      }
      log.success(`Successfully created repo: ${name}`, 2);
      resolve();
    });
  });
}
