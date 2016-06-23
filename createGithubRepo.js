const chalk = require('chalk');
var GitHubApi = require("github");
var github = new GitHubApi();
var Promise = require('bluebird');

function createGithubRepo(name, opts) {
  return new Promise(function(resolve, reject){
    console.log(`${chalk.yellow('Creating Github repository')}`);
    opts = opts || {}
    if (!name) {
        console.log(`${chalk.red('✖')} Error creating repo: name was not provided`);
      console.log("Error creating repo: name was not provided");
      return;
    }
    if (!opts.token) {
        console.log(`${chalk.red('✖')} Error creating repo: oauth token was not provided`);
      return;
    }
    github.authenticate({
      type: "oauth",
      token: opts.token
    });

    github.repos.create({
      name: name
    }, function(error, res){
      if (error) {
        console.log(`${chalk.red('✖')} Error creating repo: ${error}`);
        reject();
      }
      console.log(`${chalk.green('✔')} Successfully created repo: ${name}`);
      resolve();
    });
  })
}

module.exports = createGithubRepo;
