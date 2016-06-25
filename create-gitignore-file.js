import fs from 'fs';
import chalk from 'chalk';

function generateGitignoreString(pkg) {
  return 'node_modules';
}

export default function createGitignoreFile() {
  return new Promise((resolve, reject) => {
    console.log(`${chalk.yellow('Generating .gitignore file')}`);
    fs.writeFile(`${process.cwd()}/.gitignore`, generateGitignoreString(), (err) => {
      if (err) {
        console.log(`${chalk.red('✖')} There was an error generating .gitignore file: ${err}`);
        reject();
      } else {
        console.log(`${chalk.green('✔')} Successfully generated .gitignore file.`);
        resolve();
      }
    });
  });
}
