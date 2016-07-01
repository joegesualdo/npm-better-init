import chalk from 'chalk';
import readline from 'readline';
import mergeOptions from './merge-options';
import PromiseQueue from '@joegesualdo/promise-queue';

function askQuestion(question, startingPackage) {
  return new Promise(function(resolve, reject){
    const rl = readline.createInterface({
      input: process.stdin,
      // output: process.stdout
    });

    readline.emitKeypressEvents(process.stdin)
    process.stdin.setRawMode(true);
    process.stdout.write(question.prompt + " ")

    let answer = '';
    function onKeypress(str, key) {
      if (key.ctrl && key.name === 'c') {
          process.emit('SIGINT')
      } else if (key && key.name == 'backspace') {
        process.stdout.clearLine();
        process.stdout.cursorTo(0)
        process.stdout.write(question.prompt + " ")
        answer = answer.slice(0, answer.length - 1);
        process.stdout.write(chalk.blue(answer));
      } else {
        process.stdout.clearLine();
        process.stdout.cursorTo(0)
        process.stdout.write(question.prompt + " ")
        answer = answer + str;
        process.stdout.write(chalk.blue(answer));
      }
    }

    function onSigint() {
      process.exit();
    }

    process.stdin.on('keypress',onKeypress)

    process.on('SIGINT', onSigint)

    rl.on('line', () => {
      process.stdout.write('\n');
      // clean listeners
      process.removeListener('SIGINT', onSigint)
      process.stdin.removeListener('keypress', onKeypress)
      process.stdin.setRawMode(false);
      rl.close();
      resolve(question.onEnter(answer))
    })
  })
}

// startingPackage is the object you want to add the package
//   key/values pairs to.
export default function askQuestions(questions) {
  // startingPackage = startingPackage || {}
  return new Promise(function(resolve, reject){
    var promises = questions.map(function(question){
      return function(questionsObj) {
        return new Promise((resolve, reject) => {
          askQuestion(question, questions)
          .then((answer) => {
            questionsObj[question.identifier] = question;
            questionsObj[question.identifier]['answer'] = answer;
            resolve(questionsObj);
          })
        });
      }
      return askQuestion.bind(null, question, startingPackage)
    })
    let promiseQueue = new PromiseQueue(promises)

    let questionsObj = {};
    promiseQueue.run(questionsObj)
    .then(function(result){
      let pkg = {}
      pkg['name'] = result.moduleName.answer;
      pkg['repository'] = result.githubRepoName.answer;
      pkg['version'] = result.version.answer;
      pkg['description'] = result.description.answer;
      pkg['main'] = result.entry.answer;
      pkg['scripts'] = {}
      pkg['scripts']['test'] = `${result.testCommand.answer}`;
      pkg['devDependencies'] = result.devDependencies.answer;
      pkg['dependencies'] = result.dependencies.answer;
      pkg['keywords'] = result.keywords.answer;
      pkg['author'] = {}
      pkg['author']['name'] = result.authorName.result;
      pkg['author']['email'] = result.authorEmail.result;
      pkg['author']['url'] = result.authorUrl.result;
      pkg['license'] = result.license.result;
      resolve(pkg)
    })
  })
}
