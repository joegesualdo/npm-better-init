import chalk from 'chalk';
import { exec } from 'child_process';
import log from '@joegesualdo/terminal-log';
import indentString from '@joegesualdo/indent-string';

export default function addGitRemote(username, repo) {
  return new Promise((resolve, reject) => {
    console.log(indentString(`${chalk.yellow('Adding github origin...')}`, 2));
    exec(`git remote add origin git@github.com:${username}/${repo}.git`, (error, stdout, stderr) => {
      if (error) {
        log.error(`There was an error adding github as origin: ${error}`, 2);
      } else {
        log.success('Successfully added github as origin.', 2);
        console.log(indentString(`${chalk.yellow('Pusing code to github origin...')}`, 2));
        exec('git push -u origin master', (error, stdout, stderr) => {
          if (error) {
            log.error(`There was an error pushing code to github origin: ${error}`, 2);
            reject()
          } else {
            log.success('Successfully pushed code to github origin.', 2);
            resolve()
          }
        })
      }
    })
  })
}
