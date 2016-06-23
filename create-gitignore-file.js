var fs = require("fs");
const chalk = require('chalk');
var Promise = require('bluebird');

function generateGitignoreString(pkg) {
  return `node_modules`
}

function createGitignoreFile(){
  return new Promise(function(resolve, reject){
    console.log(`${chalk.yellow('Generating .gitignore file')}`);
    fs.writeFile(process.cwd() + '/.gitignore', generateGitignoreString(), (err) => {
      if (err) {
        console.log(`${chalk.red('✖')} There was an error generating .gitignore file: ${err}`);
        reject()
      } else {
        console.log(`${chalk.green('✔')} Successfully generated .gitignore file.`);
        resolve()
      }
    });
  });
}

module.exports = createGitignoreFile;
