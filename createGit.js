import chalk from 'chalk';
import { exec } from 'child_process';
import log from '@joegesualdo/terminal-log';
import indentString from '@joegesualdo/indent-string';

export default function createGit(projectPath) {
  return new Promise((resolve, reject) => {
    // console.log(indentString(`${chalk.yellow('Setting up git...')}`, 2));
    process.chdir(projectPath);
    exec("git init", (error, stdout, stderr) => {
      exec("git add .", (error, stdout, stderr) => {
        exec("git commit -m 'Initial Commit'", (error, stdout, stderr) => {
          log.success('Successfully Setup git.', 2);
          resolve()
        });
      });
    });
  });
}
