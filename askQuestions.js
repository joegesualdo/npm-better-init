import chalk from 'chalk';
import Promise from 'bluebird';
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
      // } else if (key && key.name == 'enter') {
        // process.stdout.write('\n');
        // rl.close();
        // resolve(mergeOptions(question.onEnter(answer, startingPackage)))
      } else {
        answer = answer + str;
        process.stdout.write(chalk.blue(str));
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
