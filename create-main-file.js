import fs from 'fs';
import chalk from 'chalk';
import log from '@joegesualdo/terminal-log';

function generateMainFileString(isReact) {
  let s = ''
  if (isReact) {
    s = `import React from 'react';
import ReactDOM from 'react-dom';
import style from './index.css';

const propTypes = {
};

const defaultProps = {
};

class TestComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <span className={style.root}>Meow</span>
    );
  }
}

TestComponent.propTypes = propTypes;
TestComponent.defaultProps = defaultProps;

export default TestComponent;
`;
  } else {
  }
  return s
}

function createMainFile(opts) {
  return new Promise((resolve, reject) => {
    opts = opts || {};
    opts.cli = opts.cli || false;
    opts.isReact = opts.isReact || false;

    let fileName = '';
    if (opts.cli) {
      fileName = 'cli.js';
    } else if (opts.isReact) {
      fileName = 'index.jsx';
    } else {
      fileName = 'index.js';
    }

    fs.writeFile(`${process.cwd()}/${fileName}`, generateMainFileString(opts.isReact), (err) => {
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
