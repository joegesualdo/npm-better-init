import chalk from 'chalk';
import { exec } from 'child_process';
import log from '@joegesualdo/terminal-log';
import indentString from '@joegesualdo/indent-string';

export default function installDependencies() {
  return new Promise((resolve, reject) => {
    console.log(indentString(`${chalk.yellow('Installing dependencies...')}`, 2));
    exec('npm install', (error, stdout, stderr) => {
      if (error) {
        log.error(`There was an error installing dependencies: ${error}`, 2);
        reject();
      } else {
        log.success('Successfully installed dependencies', 2);
        resolve();
      }
    });
  });
}
