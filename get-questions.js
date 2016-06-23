function getQuestions(username, projectName, isCli) {
  console.log(username)
  var questions = [
    {
      prompt: "Name: (" + projectName + ")",
      onEnter: function(answer, pkg) {
        pkg.name = answer || projectName;
        return pkg;
      }
    },
    {
      prompt: "Version: (1.0.0)",
      onEnter: function(answer, pkg) {
        pkg.version = answer || "1.0.0";
        return pkg;
      }
    },
    {
      prompt: "Description:",
      onEnter: function(answer, pkg) {
        pkg.description = answer;
        return pkg;
      }
    },
    {
      prompt: "Entry Point: (" + (isCli ? "./dist/cli.js" : "./dist/index.js") + ")",
      onEnter: function(answer, pkg) {
        if (isCli) {
          pkg.main = answer || "./dist/cli.js";
        } else {
          pkg.main = answer || "./dist/index.js";
        }
        return pkg;
      }
    },
    {
      prompt: "Test Command: ($ ava test.js)",
      onEnter: function(answer, pkg) {
        pkg['scripts'] = {
          test: answer || "./node_modules/ava/cli.js -v test.js"
        }
        return pkg;
      }
    },
    {
      prompt: `Github Repository name: (${username}/<REPO_NAME>)`,
      onEnter: function(answer, pkg) {
        pkg.repository = `${username}/${answer}`;
        return pkg;
      }
    },
    {
      prompt: "Keywords:",
      onEnter: function(answer, pkg) {
        // split and remove empty strings
        pkg.keywords = answer.split(",").filter(function(e){return e});
        return pkg;
      }
    },
    {
      prompt: "Author:",
      onEnter: function(answer, pkg) {
        pkg.author = {name: answer};
        return pkg;
      }
    },
    {
      prompt: "License: (MIT)",
      onEnter: function(answer, pkg) {
        pkg.license = answer || "MIT";
        return pkg;
      }
    },
    {
      prompt: "devDependencies:",
      onEnter: function(answer, pkg) {
        pkg.devDependencies = {}
        // split and remove empty strings
        answer.split(",").filter(function(e){return e}).forEach(function(dep){
          pkg.devDependencies[dep] = "*"
        })
        pkg.devDependencies["ava"] = "^0.15.2"
        pkg.devDependencies["distify-cli"] = "0.0.8"
        return pkg;
      }
    },
    {
      prompt: "Dependencies:",
      onEnter: function(answer, pkg) {
        pkg.dependencies = {}
        // split and remove empty strings
        answer.split(",").filter(function(e){return e}).forEach(function(dep){
          pkg.dependencies[dep] = "*"
        })
        return pkg;
      }
    }
  ]

  if (isCli) {
    questions.push(
      {
        prompt: "Executable: (" + projectName + ")",
        onEnter: function(answer, pkg) {
          pkg['bin'] = {};
          var name = answer || projectName
          pkg['bin'][name] = "./dist/cli.js"
          return pkg;
        }
      }
    )
  }
  return questions;
}

module.exports = getQuestions;
