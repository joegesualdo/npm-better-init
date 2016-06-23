var fs = require("fs");
var Promise = require('bluebird');
const chalk = require('chalk');

function generateMainFileString() {
  return `"use strict";`
}

function createMainFile(opts) {
  return new Promise(function(resolve, reject){
    opts = opts || {}
    var fileName = 'index.js'
    opts.cli = opts.cli || false;
    if (opts.cli) {
      fileName = 'cli.js'
    }
    console.log(`${chalk.yellow(`Generating ${fileName} file`)}`);
    fs.writeFile(process.cwd() + '/' + fileName, generateMainFileString(), (err) => {
      if (err) {
        console.log(`${chalk.red('✖')} There was an error generating ${fileName} file: ${err}`);
        reject()
      } else {
        console.log(`${chalk.green('✔')} Successfully generated ${fileName} file.`);
        resolve()
      }
    });
  })
}

module.exports = createMainFile;
