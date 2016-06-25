import fs from 'fs';
import chalk from 'chalk';

function generateMochaTestFileString(pkg) {
  return `var expect = require("chai").expect
var ${pkg.name} = require("./index")

describe("Sample", function(){
  it("sample", function(){
    expect(true).to.equal(false)
  })
})
`;
}

export default function generateMochaTestFile(pkg) {
  return new Promise((resolve, reject) => {
    console.log(`${chalk.yellow('Generating test.js file')}`);
    fs.writeFile(`${process.cwd()}/test.js`, generateMochaTestFileString(pkg), (err) => {
      if (err) {
        console.log(`${chalk.red('✖')} There was an error generating test.js file: ${err}`);
        reject();
      } else {
        console.log(`${chalk.green('✔')} Successfully generated test.js file.`);
        resolve();
      }
    });
  });
}
