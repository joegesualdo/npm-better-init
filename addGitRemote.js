var Promise = require('bluebird');
var exec = require('child_process').exec;
const chalk = require('chalk');

export default function addGitRemote(username, repo) {
  return new Promise(function(resolve, reject){
    console.log(`${chalk.yellow('Adding github origin...')}`);
    exec(`git remote add origin git@github.com:${username}/${repo}.git`,function(error, stdout, stderr){
      console.log(stdout)
      if (error) {
        console.log(`${chalk.red('✖')} There was an error adding github as origin: ${error}`);
      } else {
        console.log(`${chalk.green('✔')} Successfully added github as origin.`);
        console.log(`${chalk.yellow('Pusing code to github origin...')}`);
        exec('git push -u origin master' ,function(error, stdout, stderr){
          console.log(stdout)
          if (error) {
            console.log(`${chalk.red('✖')} There was an error pushing code to github origin: ${error}`);
            reject()
          } else {
            console.log(`${chalk.green('✔')} Successfully pushed code to github origin.`);
            reject()
          }
        })
      }
    })
  })
}
