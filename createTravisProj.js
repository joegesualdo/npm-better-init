import chalk from 'chalk';
import {exec} from 'child_process';
import Promise from 'bluebird';

export default function createTravisProj(githubUsername, repo) {
  return new Promise(function(resolve, reject){
    console.log(`${chalk.yellow('Logging into Travis')}`);
    // What if user doesn't have the travis command line?
    exec(`travis login --github-token=${process.env['GITHUB_TOKEN']}`,function(error, stdout, stderr){
      console.log(stdout)
      if (error) {
        console.log(`${chalk.red('✖')} There was an error logging into Travis: ${error}`);
      } else {
        console.log(`${chalk.green('✔')} Successfully logged into Travis`);
        console.log(`${chalk.yellow('Adding project to Travis')}`);
        exec(`travis enable -r ${githubUsername}/${repo}`, function(error, stdout, stderr) {
          console.log(stdout)
          if (error) {
            console.log(`${chalk.red('✖')} There was an error adding project to Travis: ${error}`);
            reject()
          } else {
            console.log(`${chalk.green('✔')} Succesfully added project to Travis.`);
            resolve()
          }
        })
      }

    })
  })
}