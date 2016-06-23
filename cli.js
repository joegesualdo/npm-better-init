// 3rd party dependencies
var fs = require("fs");
var path  = require('path');
var mkdirp = require('mkdirp');
var dotenv = require('dotenv')
var Promise = require('bluebird');
var readline = require('readline');
var jsonfile = require('jsonfile');
var parseArgs = require('parse-argv');
var exec = require('child_process').exec;
const chalk = require('chalk');

// Imports
var createGit = require("./createGit.js")
var promiseChain = require("./promise-chain")
var mergeOptions = require("./merge-options")
var getQuestions = require("./get-questions")
var createReadme = require("./create-readme")
var createMainFile = require('./create-main-file');
var createTravisFile = require("./create-travis-file");
var createGithubRepo = require('./createGithubRepo.js');
var createGitignoreFile = require('./create-gitignore-file');
var createAvaTestFile = require('./createAvaTestFile');
import installDependencies from './installDependencies.js'
import createTravisProj from './createTravisProj.js'
import addGitRemote from './addGitRemote.js'

// dotevn configuration
dotenv.config({path: __dirname + "/.env", silent: true});

// Parse command line options
var args = process.argv.slice(2);
var argv = parseArgs(args)

// $ initster config
if (args[0] == 'config') {
  var config_args = process.argv.slice(1);
  var config_argv = parseArgs(args)
  // $ initster config --github-tocken=...
  if (config_argv['github-username']) {
    var username = config_argv['github-username']
    try {
      var logger = fs.createWriteStream(`${__dirname}/.env`, {
        flags: 'a' // 'a' means appending (old data will be preserved)
      })

      logger.write(`GITHUB_USERNAME=${username}\n`)
      logger.end()
      console.log(`${chalk.green('✔')} Your Github username has been saved.`);
      dotenv.load();
      // fs.appendFile(`${__dirname}/.env`, `GITHUB_USERNAME=${username}\n`, function(){
      //   console.log('It\'s saved!');
      //   dotenv.load();
      // })
    } catch(error) {
      throw error
    } finally {
    }
  }
  if (config_argv['github-token']) {
    var token = config_argv['github-token']
    try {
      var logger = fs.createWriteStream(`${__dirname}/.env`, {
        flags: 'a' // 'a' means appending (old data will be preserved)
      })

      logger.write(`GITHUB_TOKEN=${token}\n`)
      logger.end()
      // console.log(`${chalk.green('✔')} Your Github token has been saved.`));
      console.log(`${chalk.green('✔')} Your Github token has been saved.`);
      dotenv.load();
      // fs.appendFile(`${__dirname}/.env`, `GITHUB_TOKEN=${token}\n`, function() {
      // console.log('It\'s saved!');
      // dotenv.load();
      // })
    } catch(error) {
      throw error
    } finally {
    }
  }
  process.exit()
}

dotenv.load(); // Load the .env file into environment variables

var isCli = false
if (argv['type'] === 'cli'){
  isCli = true
}


var shouldCreateGithubRepo = false;
if (argv['g']) {
  shouldCreateGithubRepo = true;
}

function askQuestion(question, startingPackage) {
  return new Promise(function(resolve, reject){
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question(question.prompt + " ", function(answer) {
      // package = question.onEnter(answer, startingPackage)
      rl.close();
      resolve(mergeOptions(question.onEnter(answer, startingPackage)))
    })
  })
}

// startingPackage is the object you want to add the package
//   key/values pairs to.
function askQuestions(questions, startingPackage) {
  startingPackage = startingPackage || {}
  return new Promise(function(resolve, reject){
    var promises = questions.map(function(question){
      return askQuestion.bind(null, question, startingPackage)
    })
    promiseChain(promises).then(function(pkg){
      resolve(mergeOptions(startingPackage, pkg))
    })
  })
}

function getProjectPath() {
  if (argv['_'] && argv['_'][0]) {
    return process.cwd() + "/" + argv['_'][0];
  } else {
    return process.cwd();
  }
}

function getProjectName(projectPath) {
  path = projectPath;
  if (path[path.length - 1] === "/"){
    path = path.substring(0, path.length - 1);
  }
  return path.split("/").pop();
}

var projectPath = getProjectPath();
var projectName = getProjectName(projectPath);
if (projectPath !== process.cwd()) {
  mkdirp(projectPath, function (err) {
    if (err) {
      console.log(`${chalk.red('✖')} There was an error with the project path specified: ${err}`);
      process.exit()
    } else {
      process.chdir(projectPath);
      main(projectName);
    }
  });
} else {
  main(projectName);
}

function main(projectName){
  var questions = getQuestions(process.env['GITHUB_USERNAME'], projectName, isCli)
  askQuestions(questions).then(function(pkg){
    if (isCli) {
      pkg['scripts']["build"] = "./node_modules/distify-cli/cli.js --input-file=./cli.js --output-dir=./dist --is-node --is-cli";
    } else {
      pkg['scripts']["build"] = "./node_modules/distify-cli/cli.js --input-file=./index.js --output-dir=./dist --is-node";
    }
    pkg['scripts']["prepublish"] = "npm run build";
    var file = process.cwd() + '/package.json'

    jsonfile.writeFile(file, pkg, {spaces: 2}, function(err) {
    })
    return pkg 
  }).then(function(pkg){
    createTravisFile()
    .then(
      createMainFile.bind(this,{cli: isCli})
    ).then(
      createGitignoreFile
    ).then(
      createAvaTestFile.bind(this,pkg)
    ).then(
      installDependencies
    ).then(
      createGit.bind(this, projectPath)
    ).then(() => {
      if (shouldCreateGithubRepo) {
        createGithubRepo(pkg.name, {
          token: process.env['GITHUB_TOKEN']
        })
        .then(() => {
          var repoName = pkg.repository.split('/').pop()
          addGitRemote(process.env['GITHUB_USERNAME'], repoName, function() {
            createReadme(pkg, {cli: isCli})
            createTravisProj(process.env['GITHUB_USERNAME'], repoName)
          });
        })
      } else {
        createReadme(pkg, {cli: isCli})
      }
    })
  })
}



