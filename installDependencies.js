import chalk from 'chalk';
import Promise from 'bluebird';
import { exec } from 'child_process';

export default function installDependencies() {
  return new Promise((resolve, reject) => {
    console.log(`${chalk.yellow('Installing dependencies...')}`);
    exec('npm install', (error, stdout, stderr) => {
      console.log(stdout);
      if (error) {
        console.log(`${chalk.red('✖')} There was an error installing dependencies: ${error}`);
        reject();
      } else {
        console.log(`${chalk.green('✔')} Successfully installed dependencies`);
        resolve();
      }
    });
  });
}
