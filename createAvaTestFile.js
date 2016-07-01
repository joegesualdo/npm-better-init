import fs from 'fs';
import chalk from 'chalk';
import log from '@joegesualdo/terminal-log';

function generateAvaTestFileString(pkg, isReact) {
  let s = ''
  if (isReact) {
    s = `import React from 'react';
import TestComponent from './index.jsx';
import style from './index.css';
import test from 'ava';
import { shallow } from 'enzyme';

test('root tag is an input', t => {
  const wrapper = shallow(<TestComponent />);
  t.is(wrapper.type(), 'span');
});

test('root class is applied', t => {
  const wrapper = shallow(<TestComponent />);
  t.true(wrapper.hasClass(style.root));
});
`
  } else {
   s = `import test from 'ava';
import ${pkg.name} from './dist'

test(t => {
    t.deepEqual([1, 2], [1, 2]);
});`;
  }
  return s;
}

export default function createAvaTestFile(pkg, opts) {
  opts = opts || {};
  opts.isReact = opts.isReact || false
  return new Promise((resolve, reject) => {
    fs.writeFile(`${process.cwd()}/test.js`, generateAvaTestFileString(pkg, opts.isReact), (err) => {
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

module.exports = createAvaTestFile;
