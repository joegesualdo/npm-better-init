import fs from 'fs';
import log from '@joegesualdo/terminal-log';

function generateCssString() {
  return `.root {
  /* */
}
`;
}

function createMainCssFile() {
  return new Promise((resolve, reject) => {
    fs.writeFile(`${process.cwd()}/index.css`, generateCssString(), (err) => {
      if (err) {
        log.error(`There was an error generating index.css file: ${err}`);
        reject();
      } else {
        log.created('index.css', 2);
        resolve();
      }
    });
  });
}

module.exports = createMainCssFile;
