import chalk from 'chalk';
import { exec } from 'child_process';
import log from '@joegesualdo/terminal-log';

export default function addGitRemote(username, repo) {
  return new Promise((resolve, reject) => {
    console.log(`${chalk.yellow('Adding github origin...')}`);
    exec(`git remote add origin git@github.com:${username}/${repo}.git`, (error, stdout, stderr) => {
      console.log(stdout)
      if (error) {
        log.error(`There was an error adding github as origin: ${error}`);
      } else {
        log.success('Successfully added github as origin.');
        console.log(`${chalk.yellow('Pusing code to github origin...')}`);
        exec('git push -u origin master', (error, stdout, stderr) => {
          console.log(stdout)
          if (error) {
            log.error(`There was an error pushing code to github origin: ${error}`);
            reject()
          } else {
            log.success('Successfully pushed code to github origin.');
            resolve()
          }
        })
      }
    })
  })
}
