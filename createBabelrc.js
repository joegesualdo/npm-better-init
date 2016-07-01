import fs from 'fs';
import log from '@joegesualdo/terminal-log';

function generateBabelrcString() {
  return `{
  "presets": [
    "react",
    "es2015",
    'stage-0',
   ],
	"env": {
    "AVA": {
      "plugins": [
        [
          "babel-plugin-webpack-loaders",
          {
            "config": "\$\{CONFIG\}",
            "verbose": true
          }
        ]
      ]
    }
  }
}`
}

function createBabelrcFile() {
  return new Promise((resolve, reject) => {
    fs.writeFile(`${process.cwd()}/.babelrc`, generateBabelrcString(), (err) => {
      if (err) {
        log.error(`There was an error generating .babelrc fileName} file: ${err}`);
        reject();
      } else {
        log.created(`.babelrc`, 2);
        resolve();
      }
    });
  });
}

module.exports = createBabelrcFile;
