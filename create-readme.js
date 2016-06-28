import fs from 'fs';
import chalk from 'chalk';
import convertToCamelcase from 'convert-to-camelcase';
import log from '@joegesualdo/terminal-log';

function generateNPMReadmeString(opts) {
  return new Promise((resolve, reject) => {
  opts = opts || {};
  opts.cli = opts.cli || false;
  // opts.projectName = 
  // opts.npmModuleName
  // opts.npmModuleName

  var str = `## ${opts.projectName} [![Build Status](https://travis-ci.org/${opts.repo}.svg?branch=master)](https://travis-ci.org/${opts.repo})
> ${opts.description}

## Highlights

- Highlight 1
- Highlight 2
- Highlight 3

## Install
\`\`\`
$ npm install ${opts.cli ? '--global' : '--save'} ${opts.moduleName} 
\`\`\`

## Usage
\`\`\`javascript
${isCli ? `$ ${opts.moduleName}` : `var ${convertToCamelcase(opts.moduleName)} = require("${convertToCamelcase(opts.projectName)}").default`}

// insert code example here
\`\`\`

## Test
\`\`\`
$ npm test
\`\`\`
`
  if (opts.cli) {
  } else {
str += `## API
### \`methodName(arg1, arg2)\`
> What does this method do?

| Name | Type | Description |
|------|------|-------------|
| arg1 | \`Array\` | Test description|
| arg2 | \`String\` | Test description|

Returns: \`Array\`, of things

\`\`\`javascript
var ${convertToCamelcase(opts.projectName)} = require("${opts.moduleName}").default

// insert method example here
\`\`\`
`
  }

str += `## Build
\`\`\`
$ npm run build
\`\`\`

## Related
- [example-package]() - Add description of the example package here.

## License
MIT © [${opts.author.name}]()
`
  resolve(str)
  });
}

export default function createReadme(type, opts) {
  return new Promise((resolve, reject) => {
    opts = opts || {};

    let readmeString = '';
    if (type === 'npm') {
      generateNPMReadmeString(opts)
      .then((readmeString) => {
        fs.writeFile(`${process.cwd()}/readme.md`, readmeString, (err) => {
          if (err) {
            log.error(`There was an error generating README file: ${err}`);
            reject();
          } else {
            log.created('readme.md', 2);
            resolve();
          }
        });
      });
    } else {
      fs.writeFile(`${process.cwd()}/readme.md`, readmeString, (err) => {
        if (err) {
          log.error(`There was an error generating README file: ${err}`);
          reject();
        } else {
          log.created('readme.md', 2);
          resolve();
        }
      });
    }
  });
}
