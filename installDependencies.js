import chalk from 'chalk';
import { exec } from 'child_process';
import log from '@joegesualdo/terminal-log';
import indentString from '@joegesualdo/indent-string';
import TerminalSpinner from '@joegesualdo/terminal-spinner-node';

export default function installDependencies() {
  return new Promise((resolve, reject) => {
    let spinner = new TerminalSpinner({
      text: 'Installing dependencies',
      color: 'green',
    })
    spinner.begin()
    exec('npm install', (error, stdout, stderr) => {
      spinner.stop()
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
