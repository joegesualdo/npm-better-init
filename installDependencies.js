import chalk from 'chalk';
import {exec} from 'child_process';
import Promise from 'bluebird';

export default function installDependencies(callback) {
  return new Promise(function(resolve, reject){
    console.log(`${chalk.yellow('Installing dependencies...')}`);
    exec(`npm install`,function(error, stdout, stderr){
      console.log(stdout)
      if (error) {
        console.log(`${chalk.red('✖')} There was an error installing dependencies: ${error}`);
        reject()
      } else {
        console.log(`${chalk.green('✔')} Successfully installed dependencies`);
        resolve()
      }
    })
  })
}
