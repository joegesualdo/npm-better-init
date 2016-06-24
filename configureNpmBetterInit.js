import fs from 'fs'
import path from 'path'
import chalk from 'chalk';
import Promise from 'bluebird';
import parseArgs from 'parse-argv';

let envFilePath = '';
if (path.resolve(__dirname).split('/').pop() === 'dist') {
  envFilePath = path.resolve(`${__dirname}/../.env`);
} else {
  envFilePath = path.resolve(`${__dirname}/.env`);
}

console.log("env path: " + envFilePath)
export default function configureNpmBetterInit(commandLineArgs) {
  return new Promise(function(resolve, reject){
    const configArgs = commandLineArgs.slice(1);
    const configArgv = parseArgs(configArgs);
    const githubUsername = configArgv['github-username'];
    const githubToken = configArgv['github-token'];
    // $ npm-better-init config --github-token=...
    if (githubUsername) {
      try {
        // var logger = fs.createWriteStream(envFilePath, {
        //   flags: 'a', // 'a' means appending (old data will be preserved)
        //   mode: 0o777,
        // });
        // logger.write(`GITHUB_USERNAME=${githubUsername}\n`);
        // logger.end();
        // console.log(`${chalk.green('✔')} Your Github username has been saved.`);
        fs.appendFile(envFilePath, `GITHUB_USERNAME=${githubUsername}\n`, function(){
          console.log(`${chalk.green('✔')} Your Github token has been saved.`);
          resolve()
          // dotenv.load();
        })
      } catch (error) {
        console.log(`${chalk.red('✖')} There was an error saving your Github username: ${error}`);
        reject()
      } finally {
      }
    }
    if (githubToken) {
      try {
        // var logger = fs.createWriteStream(envFilePath, {
        //   flags: 'a', // 'a' means appending (old data will be preserved)
        //   mode: 0o777,
        // })

        // logger.write(`GITHUB_TOKEN=${githubToken}\n`);
        // logger.end();
        // console.log(`${chalk.green('✔')} Your Github token has been saved.`));
        fs.appendFile(envFilePath, `GITHUB_TOKEN=${githubToken}\n`, function() {
          console.log(`${chalk.green('✔')} Your Github token has been saved.`);
          resolve()
          // dotenv.load();
        })
      } catch (error) {
        console.log(`${chalk.red('✖')} There was an error saving your Github token: ${error}`);
        reject()
      } finally {
      }
    }
  })
}
