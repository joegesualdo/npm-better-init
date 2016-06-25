import chalk from 'chalk';
import readline from 'readline';
import promiseChain from './promise-chain';
import mergeOptions from './merge-options';

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
      resolve(mergeOptions(question.onEnter(answer, startingPackage)))
    })
  })
}

// startingPackage is the object you want to add the package
//   key/values pairs to.
export default function askQuestions(questions, startingPackage) {
  startingPackage = startingPackage || {}
  return new Promise(function(resolve, reject){
    var promises = questions.map(function(question){
      return askQuestion.bind(null, question, startingPackage)
    })
    promiseChain(promises).then(function(pkg){
      resolve(mergeOptions(startingPackage, pkg))
    })
  })
}
