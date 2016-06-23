var exec = require('child_process').exec;
var Promise = require('bluebird');
const chalk = require('chalk');
function createGit(projectPath) {
  return new Promise(function(resolve, reject){
    console.log(`${chalk.yellow('Setting up git...')}`);
    process.chdir(projectPath);
    exec("git init",function(error, stdout, stderr){
      console.log(stdout)
      exec("git add .",function(error, stdout, stderr){
        console.log(stdout)
        exec("git commit -m 'Initial Commit'",function(error, stdout, stderr){
          console.log(stdout)
          console.log(`${chalk.green('✔')} Successfully Setup git.`);
          resolve()
        });
      });
    });
  });
}

module.exports = createGit;
