import chalk from 'chalk';
import { exec } from 'child_process';
import log from '@joegesualdo/terminal-log';
import indentString from '@joegesualdo/indent-string';

export default function createTravisProj(githubUsername, repo) {
  return new Promise((resolve, reject) => {
    console.log(indentString(`${chalk.yellow('Logging into Travis')}`, 2));
    // What if user doesn't have the travis command line?
    exec(`travis login --github-token=${process.env['GITHUB_TOKEN']}`, (error, stdout, stderr) => {
      if (error) {
        log.error(`There was an error logging into Travis: ${error}`, 2);
      } else {
        log.success(`Successfully logged into Travis`, 2);
        console.log(indentString(`${chalk.yellow('Adding project to Travis')}`, 2));
        exec(`travis enable -r ${githubUsername}/${repo}`, (error, stdout, stderr) => {
          if (error) {
            log.error(`There was an error adding project to Travis: ${error}`, 2);
            reject();
          } else {
            log.success('Succesfully added project to Travis.', 2);
            resolve();
          }
        });
      }
    });
  });
}
