import chalk from 'chalk';
import { exec } from 'child_process';
import log from '@joegesualdo/terminal-log';

export default function installDependencies() {
  return new Promise((resolve, reject) => {
    console.log(`${chalk.yellow('Installing dependencies...')}`);
    exec('npm install', (error, stdout, stderr) => {
      console.log(stdout);
      if (error) {
        log.error(`There was an error installing dependencies: ${error}`);
        reject();
      } else {
        log.success('Successfully installed dependencies');
        resolve();
      }
    });
  });
}
