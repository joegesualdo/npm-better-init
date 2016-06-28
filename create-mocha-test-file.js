import fs from 'fs';
import chalk from 'chalk';
import log from '@joegesualdo/terminal-log';

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
    fs.writeFile(`${process.cwd()}/test.js`, generateMochaTestFileString(pkg), (err) => {
      if (err) {
        log.error(`There was an error generating test.js file: ${err}`);
        reject();
      } else {
        log.created('test.js', 2);
        resolve();
      }
    });
  });
}
