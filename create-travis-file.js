import fs from 'fs';
import chalk from 'chalk';
import Promise from 'bluebird';

function generateTravisString() {
  return `language: node_js
node_js:
  - '6.2.1'
`;
}

export default function createTravisFile(pkg) {
  return new Promise((resolve, reject) => {
    console.log(`${chalk.yellow('Generating .travis.yml file')}`);
    fs.writeFile(`${process.cwd()}/.travis.yml`, generateTravisString(), (err) => {
      if (err) {
        console.log(`${chalk.red('✖')} There was an error generating .travis.yml file: ${err}`);
        reject();
      } else {
        console.log(`${chalk.green('✔')} Successfully generated .travis.yml file.`);
        resolve();
      }
    });
  });
}

