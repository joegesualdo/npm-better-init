import chalk from 'chalk';
import { exec } from 'child_process';
import log from '@joegesualdo/terminal-log';
import indentString from '@joegesualdo/indent-string';
import TerminalSpinner from '@joegesualdo/terminal-spinner-node';

export default function createGit(projectPath) {
  return new Promise((resolve, reject) => {
    let spinner = new TerminalSpinner({
      text: 'Setting up git',
      color: 'green',
    })
    spinner.begin()
    process.chdir(projectPath);
    exec("git init", (error, stdout, stderr) => {
      exec("git add .", (error, stdout, stderr) => {
        exec("git commit -m 'Initial Commit'", (error, stdout, stderr) => {
          spinner.stop()
          log.success('Setup git', 2);
          resolve()
        });
      });
    });
  });
}
