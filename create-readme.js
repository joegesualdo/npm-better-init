import fs from 'fs';
import chalk from 'chalk';
import Promise from 'bluebird';
import convertToCamelcase from 'convert-to-camelcase';

function generateReadmeString(pkg, isCli) {

  var str = `## ${pkg.name} [![Build Status](https://travis-ci.org/${pkg.repository}.svg?branch=master)](https://travis-ci.org/${pkg.repository})
> ${pkg.description}

## Highlights

- Highlight 1
- Highlight 2
- Highlight 3

## Install
\`\`\`
$ npm install ${isCli ? '--global' : '--save'} ${pkg.name} 
\`\`\`

## Usage
\`\`\`javascript
${isCli ? `$ ${pkg.name}` : `var ${convertToCamelcase(pkg.name)} = require("${pkg.name}").default`}

// insert code example here
\`\`\`

## Test
\`\`\`
$ npm test
\`\`\`
`
  if (isCli) {
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
var ${convertToCamelcase(pkg.name)} = require("${pkg.name}").default

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
MIT © [${pkg.author.name}]()
`
return str
}

export default function createReadme(pkg, opts) {
  return new Promise((resolve, reject) => {
    opts = opts || {};
    opts.cli = opts.cli || false;

    console.log(`${chalk.yellow('Generating README file')}`);
    fs.writeFile(`${process.cwd()}/readme.md`, generateReadmeString(pkg, opts.cli), (err) => {
      if (err) {
        console.log(`${chalk.red('✖')} There was an error generating README file: ${err}`);
        reject();
      } else {
        console.log(`${chalk.green('✔')} Successfully generated README file.`);
        resolve();
      }
    });
  });
}
