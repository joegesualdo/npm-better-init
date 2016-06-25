import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import parseArgs from 'parse-argv';


export default function configureNpmBetterInit(commandLineArgs) {
  return new Promise((resolve, reject) => {
    const configArgs = commandLineArgs.slice(1);
    const configArgv = parseArgs(configArgs);
    const githubUsername = configArgv['github-username'];
    const githubToken = configArgv['github-token'];
    // For dotevn, duplicated in the main file (npmBetterInit.js)
    // TODO: refactor this and the instance in npmBetterInit
    let envFilePath = '';
    if (path.resolve(__dirname).split('/').pop() === 'dist') {
      envFilePath = path.resolve(`${__dirname}/../.env`);
    } else {
      envFilePath = path.resolve(`${__dirname}/.env`);
    }

    if (githubUsername) {
      try {
        fs.appendFile(envFilePath, `GITHUB_USERNAME=${githubUsername}\n`, () => {
          console.log(`${chalk.green('✔')} Your Github token has been saved.`);
          resolve();
        });
      } catch (error) {
        console.log(`${chalk.red('✖')} There was an error saving your Github username: ${error}`);
        reject();
      } finally {
      }
    }
    if (githubToken) {
      try {
        fs.appendFile(envFilePath, `GITHUB_TOKEN=${githubToken}\n`, () => {
          console.log(`${chalk.green('✔')} Your Github token has been saved.`);
          resolve();
        });
      } catch (error) {
        console.log(`${chalk.red('✖')} There was an error saving your Github token: ${error}`);
        reject();
      } finally {
      }
    }
  });
}
