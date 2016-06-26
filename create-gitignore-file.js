import fs from 'fs';
import chalk from 'chalk';
import log from '@joegesualdo/terminal-log';

function generateGitignoreString(pkg) {
  return 'node_modules';
}

export default function createGitignoreFile() {
  return new Promise((resolve, reject) => {
    console.log(`${chalk.yellow('Generating .gitignore file')}`);
    fs.writeFile(`${process.cwd()}/.gitignore`, generateGitignoreString(), (err) => {
      if (err) {
        log.error(`There was an error generating .gitignore file: ${err}`)
        reject();
      } else {
        log.success('Successfully generated .gitignore file.');
        resolve();
      }
    });
  });
}
