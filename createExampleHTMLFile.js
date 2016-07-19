import fs from 'fs';
import log from '@joegesualdo/terminal-log';

function generateExampleHTMLFile() {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0//EN" "http://www.w3.org/TR/REC-html40/strict.dtd">
<html>
<head>
  <title>
  </title>
  <!-- <script src="http://localhost:8080/webpack&#45;dev&#45;server.js"></script> -->
</head>
<body>
  <div class="header">
    Header
  </div>
  <script src="http://localhost:8080/assets/bundle.js"></script>
</body>
</html>`;
}

function createExampleHTMLFile() {
  return new Promise((resolve, reject) => {
    fs.writeFile(`${process.cwd()}/examples/index.html`, generateExampleHTMLFile(), (err) => {
      if (err) {
        log.error(`There was an error generating examples/index.html file: ${err}`);
        reject();
      } else {
        log.created(`examples/index.html`, 2);
        resolve();
      }
    });
  });
}

module.exports = createExampleHTMLFile;
