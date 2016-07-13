import chalk from 'chalk';
import { exec } from 'child_process';
import log from '@joegesualdo/terminal-log';
import indentString from '@joegesualdo/indent-string';
import TerminalSpinner from '@joegesualdo/terminal-spinner-node';

export default function createTravisProj(githubUsername, repo) {
  return new Promise((resolve, reject) => {
    let spinner = new TerminalSpinner({
      text: 'Setting up travis',
      color: 'green',
    })
    spinner.begin()
    // What if user doesn't have the travis command line?
    exec(`travis login --github-token=${process.env['GITHUB_TOKEN']}`, (error, stdout, stderr) => {
      if (error) {
        spinner.stop()
        log.error(`There was an error logging into Travis: ${error}`, 2);
      } else {
        exec(`travis enable -r ${githubUsername}/${repo}`, (error, stdout, stderr) => {
          if (error) {
            spinner.stop()
            log.error(`There was an error adding project to Travis: ${error}`, 2);
            reject();
          } else {
            spinner.stop()
            log.success('Added project to Travis.', 2);
            resolve();
          }
        });
      }
    });
  });
}
