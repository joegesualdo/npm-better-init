import fs from 'fs';
import chalk from 'chalk';
import log from '@joegesualdo/terminal-log';

function generateMainFileString() {
  return '"use strict";';
}

function createMainFile(opts) {
  return new Promise((resolve, reject) => {
    opts = opts || {};
    opts.cli = opts.cli || false;

    let fileName = '';
    if (opts.cli) {
      fileName = 'cli.js';
    } else {
      fileName = 'index.js';
    }

    fs.writeFile(`${process.cwd()}/${fileName}`, generateMainFileString(), (err) => {
      if (err) {
        log.error(`There was an error generating ${fileName} file: ${err}`);
        reject();
      } else {
        log.created(`${fileName}`, 2);
        resolve();
      }
    });
  });
}

module.exports = createMainFile;
