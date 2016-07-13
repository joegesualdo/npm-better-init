import chalk from 'chalk';
import GitHubApi from 'github';
import log from '@joegesualdo/terminal-log';
import indentString from '@joegesualdo/indent-string';
import TerminalSpinner from '@joegesualdo/terminal-spinner-node';

const github = new GitHubApi();

export default function createGithubRepo(name, opts) {
  return new Promise((resolve, reject) => {
    let spinner = new TerminalSpinner({
      text: 'Creating Github repo',
      color: 'green',
    })
    spinner.begin()
    opts = opts || {};
    if (!name) {
      spinner.stop()
      log.error('Error creating Github repo: name was not provided', 2);
      reject();
    }
    if (!opts.token) {
      spinner.stop()
      log.error('Error creating Github repo: oauth token was not provided', 2);
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
        spinner.stop()
        log.error(`Error creating Github repo: ${error}`, 2);
        reject();
      }
      spinner.stop()
      log.success(`Created Github repo (github.com/${opts.username}/${name})`, 2);
      resolve();
    });
  });
}
