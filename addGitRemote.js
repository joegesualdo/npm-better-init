import chalk from 'chalk';
import { exec } from 'child_process';
import log from '@joegesualdo/terminal-log';
import indentString from '@joegesualdo/indent-string';
import TerminalSpinner from '@joegesualdo/terminal-spinner-node';

export default function addGitRemote(username, repo) {
  return new Promise((resolve, reject) => {
    let spinner = new TerminalSpinner({
      text: '',
      color: 'green',
    })
    spinner.begin()
    exec(`git remote add origin git@github.com:${username}/${repo}.git`, (error, stdout, stderr) => {
      if (error) {
        spinner.stop()
        log.error(`There was an error adding github as origin: ${error}`, 2);
      } else {
        exec('git push -u origin master', (error, stdout, stderr) => {
          if (error) {
            spinner.stop()
            log.error(`There was an error pushing code to github origin: ${error}`, 2);
            reject()
          } else {
            spinner.stop()
            log.success(`Pushed code to Github (github.com/${username}/${repo})`, 2);
            resolve()
          }
        })
      }
    })
  })
}
