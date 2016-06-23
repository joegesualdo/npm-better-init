export default function configureNpmBetterInit(commandLineArgs) {
  const configArgs = commandLineArgs.slice(1);
  const configArgv = parseArgs(configArgs);
  const githubUsername = configArgv['github-username'];
  const githubToken = configArgv['github-token'];
  // $ npm-better-init config --github-token=...
  if (githubUsername) {
    try {
      var logger = fs.createWriteStream(`${__dirname}/.env`, {
        flags: 'a', // 'a' means appending (old data will be preserved)
      });
      logger.write(`GITHUB_USERNAME=${githubUsername}\n`);
      logger.end();
      console.log(`${chalk.green('✔')} Your Github username has been saved.`);
      // fs.appendFile(`${__dirname}/.env`, `GITHUB_USERNAME=${username}\n`, function(){
      //   console.log('It\'s saved!');
      //   dotenv.load();
      // })
    } catch (error) {
      console.log(`${chalk.red('✖')} There was an error saving your Github username: ${error}`);
      throw error;
    } finally {
    }
  }
  if (githubToken) {
    try {
      var logger = fs.createWriteStream(`${__dirname}/.env`, {
        flags: 'a' // 'a' means appending (old data will be preserved)
      })

      logger.write(`GITHUB_TOKEN=${githubToken}\n`);
      logger.end();
      // console.log(`${chalk.green('✔')} Your Github token has been saved.`));
      console.log(`${chalk.green('✔')} Your Github token has been saved.`);
      // fs.appendFile(`${__dirname}/.env`, `GITHUB_TOKEN=${token}\n`, function() {
      // console.log('It\'s saved!');
      // dotenv.load();
      // })
    } catch (error) {
      console.log(`${chalk.red('✖')} There was an error saving your Github token: ${error}`);
      throw error;
    } finally {
    }
  }
}
