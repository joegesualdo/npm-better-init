import fs from 'fs';
import chalk from 'chalk';

function generateAvaTestFileString(pkg) {
  return `import test from 'ava';
import ${pkg.name} from './dist'

test(t => {
    t.deepEqual([1, 2], [1, 2]);
});
`;
}

export default function createAvaTestFile(pkg) {
  return new Promise((resolve, reject) => {
    console.log(`${chalk.yellow('Generating test.js file')}`);
    fs.writeFile(`${process.cwd()}/test.js`, generateAvaTestFileString(pkg), (err) => {
      if (err) {
        console.log(`${chalk.red('✖')} There was an error generating test.js file: ${err}`);
        reject();
      } else {
        console.log(`${chalk.green('✔')} Successfully generated test.js file.`);
        resolve();
      }
    });
  });
}

module.exports = createAvaTestFile;
