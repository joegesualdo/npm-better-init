import chalk from 'chalk';
import Promise from 'bluebird';
import { exec } from 'child_process';

export default function createTravisProj(githubUsername, repo) {
  return new Promise((resolve, reject) => {
    console.log(`${chalk.yellow('Logging into Travis')}`);
    // What if user doesn't have the travis command line?
    exec(`travis login --github-token=${process.env['GITHUB_TOKEN']}`, (error, stdout, stderr) => {
      console.log(stdout);
      if (error) {
        console.log(`${chalk.red('✖')} There was an error logging into Travis: ${error}`);
      } else {
        console.log(`${chalk.green('✔')} Successfully logged into Travis`);
        console.log(`${chalk.yellow('Adding project to Travis')}`);
        exec(`travis enable -r ${githubUsername}/${repo}`, (error, stdout, stderr) => {
          console.log(stdout);
          if (error) {
            console.log(`${chalk.red('✖')} There was an error adding project to Travis: ${error}`);
            reject();
          } else {
            console.log(`${chalk.green('✔')} Succesfully added project to Travis.`);
            resolve();
          }
        });
      }
    });
  });
}
