import Promise from 'bluebird';
import readline from 'readline';
import promiseChain from './promise-chain';
import mergeOptions from './merge-options';

function askQuestion(question, startingPackage) {
  return new Promise(function(resolve, reject){
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question(question.prompt + " ", function(answer) {
      // package = question.onEnter(answer, startingPackage)
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
