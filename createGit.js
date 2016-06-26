import chalk from 'chalk';
import { exec } from 'child_process';
import log from '@joegesualdo/terminal-log';

export default function createGit(projectPath) {
  return new Promise((resolve, reject) => {
    console.log(`${chalk.yellow('Setting up git...')}`);
    process.chdir(projectPath);
    exec("git init", (error, stdout, stderr) => {
      console.log(stdout)
      exec("git add .", (error, stdout, stderr) => {
        console.log(stdout)
        exec("git commit -m 'Initial Commit'", (error, stdout, stderr) => {
          console.log(stdout)
          log.success('Successfully Setup git.');
          resolve()
        });
      });
    });
  });
}
