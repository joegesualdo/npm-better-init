#!/usr/bin/env node
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _fs = __webpack_require__(1);

	var _fs2 = _interopRequireDefault(_fs);

	var _path = __webpack_require__(2);

	var _path2 = _interopRequireDefault(_path);

	var _pify = __webpack_require__(3);

	var _pify2 = _interopRequireDefault(_pify);

	var _chalk = __webpack_require__(4);

	var _chalk2 = _interopRequireDefault(_chalk);

	var _mkdirp = __webpack_require__(5);

	var _mkdirp2 = _interopRequireDefault(_mkdirp);

	var _dotenv = __webpack_require__(6);

	var _dotenv2 = _interopRequireDefault(_dotenv);

	var _parseArgv = __webpack_require__(7);

	var _parseArgv2 = _interopRequireDefault(_parseArgv);

	var _npmBetterInit = __webpack_require__(8);

	var _npmBetterInit2 = _interopRequireDefault(_npmBetterInit);

	var _getFileNameFromPath = __webpack_require__(29);

	var _getFileNameFromPath2 = _interopRequireDefault(_getFileNameFromPath);

	var _configureNpmBetterInit = __webpack_require__(30);

	var _configureNpmBetterInit2 = _interopRequireDefault(_configureNpmBetterInit);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// dotevn configuration ======
	// 3rd party dependencies
	var envFilePath = '';

	// Imports

	if (_path2.default.resolve(__dirname).split('/').pop() === 'dist') {
	  envFilePath = _path2.default.resolve(__dirname + '/../.env');
	} else {
	  envFilePath = _path2.default.resolve(__dirname + '/.env');
	}
	_dotenv2.default.config({ // This actually loads the .env variables into the ENV
	  path: envFilePath,
	  silent: true
	});

	// Parse command line options
	var args = process.argv.slice(2);
	var argv = (0, _parseArgv2.default)(args);

	// Set variables
	var isCli = argv['type'] === 'cli';
	var isConfig = args[0] === 'config';
	var shouldCreateGithubRepo = argv['g'] ? true : false;
	var isProjectPathProvided = argv['_'] && argv['_'][0];
	// Get's absolute path of project, if user picked one.
	var providedProjectPath = isProjectPathProvided ? process.cwd() + '/' + argv['_'][0] : undefined;
	var projectPath = providedProjectPath || process.cwd();
	var projectName = (0, _getFileNameFromPath2.default)(projectPath);

	// $ npm-better-init config
	if (isConfig) {
	  (0, _configureNpmBetterInit2.default)(args).then(function () {
	    process.exit();
	  });
	}

	if (providedProjectPath) {
	  (0, _pify2.default)(_mkdirp2.default)(projectPath).then(function () {
	    process.chdir(projectPath);
	    (0, _npmBetterInit2.default)(projectName, projectPath, isCli, shouldCreateGithubRepo, {
	      github: {
	        token: process.env['GITHUB_TOKEN'],
	        username: process.env['GITHUB_USERNAME']
	      }
	    });
	  }).catch(function (err) {
	    console.log(_chalk2.default.red('✖') + ' There was an error with the project path specified: ' + err);
	    process.exit();
	  });
	} else {
	  (0, _npmBetterInit2.default)(projectName, projectPath, isCli, shouldCreateGithubRepo, {
	    github: {
	      token: process.env['GITHUB_TOKEN'],
	      username: process.env['GITHUB_USERNAME']
	    }
	  });
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("pify");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("chalk");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("mkdirp");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("dotenv");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("parse-argv");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = npmBetterInit;

	var _jsonfile = __webpack_require__(9);

	var _jsonfile2 = _interopRequireDefault(_jsonfile);

	var _createGit = __webpack_require__(10);

	var _createGit2 = _interopRequireDefault(_createGit);

	var _getQuestions = __webpack_require__(13);

	var _getQuestions2 = _interopRequireDefault(_getQuestions);

	var _createReadme = __webpack_require__(14);

	var _createReadme2 = _interopRequireDefault(_createReadme);

	var _askQuestions = __webpack_require__(16);

	var _askQuestions2 = _interopRequireDefault(_askQuestions);

	var _addGitRemote = __webpack_require__(20);

	var _addGitRemote2 = _interopRequireDefault(_addGitRemote);

	var _createMainFile = __webpack_require__(21);

	var _createMainFile2 = _interopRequireDefault(_createMainFile);

	var _createTravisFile = __webpack_require__(22);

	var _createTravisFile2 = _interopRequireDefault(_createTravisFile);

	var _createAvaTestFile = __webpack_require__(23);

	var _createAvaTestFile2 = _interopRequireDefault(_createAvaTestFile);

	var _createTravisProj = __webpack_require__(24);

	var _createTravisProj2 = _interopRequireDefault(_createTravisProj);

	var _createGithubRepo = __webpack_require__(25);

	var _createGithubRepo2 = _interopRequireDefault(_createGithubRepo);

	var _createGitignoreFile = __webpack_require__(27);

	var _createGitignoreFile2 = _interopRequireDefault(_createGitignoreFile);

	var _installDependencies = __webpack_require__(28);

	var _installDependencies2 = _interopRequireDefault(_installDependencies);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function npmBetterInit(projectName, projectDirectory, isCli, shouldCreateGithubRepo, opts) {
	  var _this = this;

	  opts = opts || {};
	  opts.github = opts.github || {};
	  var questions = (0, _getQuestions2.default)(opts.github.username, projectName, isCli);
	  (0, _askQuestions2.default)(questions).then(function (pkg) {
	    var packageFilePath = process.cwd() + '/package.json';
	    if (isCli) {
	      pkg['scripts']['build'] = './node_modules/distify-cli/cli.js --input-file=./cli.js --output-dir=./dist --is-node --is-cli';
	    } else {
	      pkg['scripts']['build'] = './node_modules/distify-cli/cli.js --input-file=./index.js --output-dir=./dist --is-node';
	    }
	    pkg['scripts']['prepublish'] = 'npm run build';

	    _jsonfile2.default.writeFile(packageFilePath, pkg, { spaces: 2 }, function (err) {});
	    return pkg;
	  }).then(function (pkg) {
	    var repoName = pkg.repository.split('/').pop();

	    (0, _createTravisFile2.default)().then(_createMainFile2.default.bind(_this, { cli: isCli })).then(_createGitignoreFile2.default).then(_createAvaTestFile2.default.bind(_this, pkg)).then(_installDependencies2.default).then(_createGit2.default.bind(_this, projectDirectory)).then(function () {
	      if (shouldCreateGithubRepo) {
	        (0, _createGithubRepo2.default)(pkg.name, {
	          token: opts.github.token
	        }).then(_addGitRemote2.default.bind(_this, opts.github.username, repoName)).then(_createReadme2.default.bind(_this, pkg, { cli: isCli })).then(_createTravisProj2.default.bind(_this, opts.github.username, repoName));
	      } else {
	        (0, _createReadme2.default)(pkg, { cli: isCli });
	      }
	    });
	  });
	}

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("jsonfile");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = createGit;

	var _chalk = __webpack_require__(4);

	var _chalk2 = _interopRequireDefault(_chalk);

	var _child_process = __webpack_require__(11);

	var _bluebird = __webpack_require__(12);

	var _bluebird2 = _interopRequireDefault(_bluebird);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function createGit(projectPath) {
	  return new _bluebird2.default(function (resolve, reject) {
	    console.log('' + _chalk2.default.yellow('Setting up git...'));
	    process.chdir(projectPath);
	    (0, _child_process.exec)("git init", function (error, stdout, stderr) {
	      console.log(stdout);
	      (0, _child_process.exec)("git add .", function (error, stdout, stderr) {
	        console.log(stdout);
	        (0, _child_process.exec)("git commit -m 'Initial Commit'", function (error, stdout, stderr) {
	          console.log(stdout);
	          console.log(_chalk2.default.green('✔') + ' Successfully Setup git.');
	          resolve();
	        });
	      });
	    });
	  });
	}

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("child_process");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("bluebird");

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getQuestions;

	var _chalk = __webpack_require__(4);

	var _chalk2 = _interopRequireDefault(_chalk);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getQuestions(username, projectName, isCli) {
	  var questions = [{
	    prompt: _chalk2.default.green('?') + ' What do you want to name your module? (' + projectName + ')',
	    onEnter: function onEnter(answer, pkg) {
	      pkg.name = answer || projectName;
	      return pkg;
	    }
	  }, {
	    prompt: _chalk2.default.green('?') + ' What version is it? (0.0.1)',
	    onEnter: function onEnter(answer, pkg) {
	      pkg.version = answer || "0.0.1";
	      return pkg;
	    }
	  }, {
	    prompt: _chalk2.default.green('?') + ' What is a description of this module?',
	    onEnter: function onEnter(answer, pkg) {
	      pkg.description = answer;
	      return pkg;
	    }
	  }, {
	    prompt: _chalk2.default.green('?') + ' What file should be used for the entry point? (' + (isCli ? './dist/cli.js' : './dist/index.js') + ')',
	    onEnter: function onEnter(answer, pkg) {
	      if (isCli) {
	        pkg.main = answer || './dist/cli.js';
	      } else {
	        pkg.main = answer || './dist/index.js';
	      }
	      return pkg;
	    }
	  }, {
	    prompt: _chalk2.default.green('?') + ' What is the test command? ($ ava test.js)',
	    onEnter: function onEnter(answer, pkg) {
	      pkg['scripts'] = {
	        test: answer || './node_modules/ava/cli.js -v test.js'
	      };
	      return pkg;
	    }
	  }, {
	    prompt: _chalk2.default.green('?') + ' What do you want to name your github repo? (' + username + '/<REPO_NAME>)',
	    onEnter: function onEnter(answer, pkg) {
	      pkg.repository = username + '/' + answer;
	      return pkg;
	    }
	  }, {
	    prompt: _chalk2.default.green('?') + ' What keywords describe this module?',
	    onEnter: function onEnter(answer, pkg) {
	      // split and remove empty strings
	      pkg.keywords = answer.split(',').filter(function (e) {
	        return e;
	      });
	      return pkg;
	    }
	  }, {
	    prompt: _chalk2.default.green('?') + ' What\'s the author\'s name',
	    onEnter: function onEnter(answer, pkg) {
	      pkg.author = {
	        name: answer
	      };
	      return pkg;
	    }
	  }, {
	    prompt: _chalk2.default.green('?') + ' What license do you want to include? (MIT)',
	    onEnter: function onEnter(answer, pkg) {
	      pkg.license = answer || 'MIT';
	      return pkg;
	    }
	  }, {
	    prompt: _chalk2.default.green('?') + ' What are the devDependencies?',
	    onEnter: function onEnter(answer, pkg) {
	      pkg.devDependencies = {};
	      // split and remove empty strings
	      answer.split(",").filter(function (e) {
	        return e;
	      }).forEach(function (dep) {
	        pkg.devDependencies[dep] = '*';
	      });
	      pkg.devDependencies['ava'] = '^0.15.2';
	      pkg.devDependencies['distify-cli'] = '0.0.8';
	      return pkg;
	    }
	  }, {
	    prompt: _chalk2.default.green('?') + ' What are the dependencies?',
	    onEnter: function onEnter(answer, pkg) {
	      pkg.dependencies = {};
	      // split and remove empty strings
	      answer.split(',').filter(function (e) {
	        return e;
	      }).forEach(function (dep) {
	        pkg.dependencies[dep] = '*';
	      });
	      return pkg;
	    }
	  }];

	  if (isCli) {
	    questions.push({
	      prompt: _chalk2.default.green('?') + ' What do you want the cli exectable to be? (' + projectName + ')',
	      onEnter: function onEnter(answer, pkg) {
	        var name = answer || projectName;
	        pkg['bin'] = {};
	        pkg['bin'][name] = './dist/cli.js';
	        return pkg;
	      }
	    });
	  }
	  return questions;
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = createReadme;

	var _fs = __webpack_require__(1);

	var _fs2 = _interopRequireDefault(_fs);

	var _chalk = __webpack_require__(4);

	var _chalk2 = _interopRequireDefault(_chalk);

	var _bluebird = __webpack_require__(12);

	var _bluebird2 = _interopRequireDefault(_bluebird);

	var _convertToCamelcase = __webpack_require__(15);

	var _convertToCamelcase2 = _interopRequireDefault(_convertToCamelcase);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function generateReadmeString(pkg, isCli) {

	  var str = '## ' + pkg.name + ' [![Build Status](https://travis-ci.org/' + pkg.repository + '.svg?branch=master)](https://travis-ci.org/' + pkg.repository + ')\n> ' + pkg.description + '\n\n## Highlights\n\n- Highlight 1\n- Highlight 2\n- Highlight 3\n\n## Install\n```\n$ npm install ' + (isCli ? '--global' : '--save') + ' ' + pkg.name + ' \n```\n\n## Usage\n```javascript\n' + (isCli ? '$ ' + pkg.name : 'var ' + (0, _convertToCamelcase2.default)(pkg.name) + ' = require("' + pkg.name + '").default') + '\n\n// insert code example here\n```\n\n## Test\n```\n$ npm test\n```\n';
	  if (isCli) {} else {
	    str += '## API\n### `methodName(arg1, arg2)`\n> What does this method do?\n\n| Name | Type | Description |\n|------|------|-------------|\n| arg1 | `Array` | Test description|\n| arg2 | `String` | Test description|\n\nReturns: `Array`, of things\n\n```javascript\nvar ' + (0, _convertToCamelcase2.default)(pkg.name) + ' = require("' + pkg.name + '").default\n\n// insert method example here\n```\n';
	  }

	  str += '## Build\n```\n$ npm run build\n```\n\n## Related\n- [example-package]() - Add description of the example package here.\n\n## License\nMIT © [' + pkg.author.name + ']()\n';
	  return str;
	}

	function createReadme(pkg, opts) {
	  return new _bluebird2.default(function (resolve, reject) {
	    opts = opts || {};
	    opts.cli = opts.cli || false;

	    console.log('' + _chalk2.default.yellow('Generating README file'));
	    _fs2.default.writeFile(process.cwd() + '/readme.md', generateReadmeString(pkg, opts.cli), function (err) {
	      if (err) {
	        console.log(_chalk2.default.red('✖') + ' There was an error generating README file: ' + err);
	        reject();
	      } else {
	        console.log(_chalk2.default.green('✔') + ' Successfully generated README file.');
	        resolve();
	      }
	    });
	  });
	}

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("convert-to-camelcase");

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = askQuestions;

	var _chalk = __webpack_require__(4);

	var _chalk2 = _interopRequireDefault(_chalk);

	var _bluebird = __webpack_require__(12);

	var _bluebird2 = _interopRequireDefault(_bluebird);

	var _readline = __webpack_require__(17);

	var _readline2 = _interopRequireDefault(_readline);

	var _promiseChain = __webpack_require__(18);

	var _promiseChain2 = _interopRequireDefault(_promiseChain);

	var _mergeOptions = __webpack_require__(19);

	var _mergeOptions2 = _interopRequireDefault(_mergeOptions);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function askQuestion(question, startingPackage) {
	  return new _bluebird2.default(function (resolve, reject) {
	    var rl = _readline2.default.createInterface({
	      input: process.stdin
	    });

	    // output: process.stdout
	    _readline2.default.emitKeypressEvents(process.stdin);
	    process.stdin.setRawMode(true);
	    process.stdout.write(question.prompt + " ");

	    var answer = '';
	    function onKeypress(str, key) {
	      if (key.ctrl && key.name === 'c') {
	        process.emit('SIGINT');
	      } else if (key && key.name == 'backspace') {
	        process.stdout.clearLine();
	        process.stdout.cursorTo(0);
	        process.stdout.write(question.prompt + " ");
	        answer = answer.slice(0, answer.length - 1);
	        process.stdout.write(_chalk2.default.blue(answer));
	      } else {
	        process.stdout.clearLine();
	        process.stdout.cursorTo(0);
	        process.stdout.write(question.prompt + " ");
	        answer = answer + str;
	        process.stdout.write(_chalk2.default.blue(answer));
	      }
	    }

	    function onSigint() {
	      process.exit();
	    }

	    process.stdin.on('keypress', onKeypress);

	    process.on('SIGINT', onSigint);

	    rl.on('line', function () {
	      process.stdout.write('\n');
	      // clean listeners
	      process.removeListener('SIGINT', onSigint);
	      process.stdin.removeListener('keypress', onKeypress);
	      process.stdin.setRawMode(false);
	      rl.close();
	      resolve((0, _mergeOptions2.default)(question.onEnter(answer, startingPackage)));
	    });
	  });
	}

	// startingPackage is the object you want to add the package
	//   key/values pairs to.
	function askQuestions(questions, startingPackage) {
	  startingPackage = startingPackage || {};
	  return new _bluebird2.default(function (resolve, reject) {
	    var promises = questions.map(function (question) {
	      return askQuestion.bind(null, question, startingPackage);
	    });
	    (0, _promiseChain2.default)(promises).then(function (pkg) {
	      resolve((0, _mergeOptions2.default)(startingPackage, pkg));
	    });
	  });
	}

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("readline");

/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = promiseChain;
	function promiseChain(promiseArray) {
	  return new Promise(function (resolve, reject) {
	    var currentIndex = 0;

	    function next(passedVal) {
	      currentIndex++;
	      if (currentIndex >= promiseArray.length) {
	        resolve(passedVal);
	      } else {
	        promiseArray[currentIndex]().then(function (passedVal) {
	          next(passedVal);
	        });
	      }
	    }
	    promiseArray[currentIndex]().then(function (passedVal) {
	      next(passedVal);
	    });
	  });
	}

/***/ },
/* 19 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = mergeOptions;
	function mergeOptions(obj1, obj2) {
	  var obj3 = {};
	  for (var attrname in obj1) {
	    obj3[attrname] = obj1[attrname];
	  }
	  for (var _attrname in obj2) {
	    obj3[_attrname] = obj2[_attrname];
	  }
	  return obj3;
	}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = addGitRemote;

	var _chalk = __webpack_require__(4);

	var _chalk2 = _interopRequireDefault(_chalk);

	var _bluebird = __webpack_require__(12);

	var _bluebird2 = _interopRequireDefault(_bluebird);

	var _child_process = __webpack_require__(11);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function addGitRemote(username, repo) {
	  return new _bluebird2.default(function (resolve, reject) {
	    console.log('' + _chalk2.default.yellow('Adding github origin...'));
	    (0, _child_process.exec)('git remote add origin git@github.com:' + username + '/' + repo + '.git', function (error, stdout, stderr) {
	      console.log(stdout);
	      if (error) {
	        console.log(_chalk2.default.red('✖') + ' There was an error adding github as origin: ' + error);
	      } else {
	        console.log(_chalk2.default.green('✔') + ' Successfully added github as origin.');
	        console.log('' + _chalk2.default.yellow('Pusing code to github origin...'));
	        (0, _child_process.exec)('git push -u origin master', function (error, stdout, stderr) {
	          console.log(stdout);
	          if (error) {
	            console.log(_chalk2.default.red('✖') + ' There was an error pushing code to github origin: ' + error);
	            reject();
	          } else {
	            console.log(_chalk2.default.green('✔') + ' Successfully pushed code to github origin.');
	            reject();
	          }
	        });
	      }
	    });
	  });
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _fs = __webpack_require__(1);

	var _fs2 = _interopRequireDefault(_fs);

	var _chalk = __webpack_require__(4);

	var _chalk2 = _interopRequireDefault(_chalk);

	var _bluebird = __webpack_require__(12);

	var _bluebird2 = _interopRequireDefault(_bluebird);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function generateMainFileString() {
	  return '"use strict";';
	}

	function createMainFile(opts) {
	  return new _bluebird2.default(function (resolve, reject) {
	    opts = opts || {};
	    opts.cli = opts.cli || false;

	    var fileName = '';
	    if (opts.cli) {
	      fileName = 'cli.js';
	    } else {
	      fileName = 'index.js';
	    }

	    console.log('' + _chalk2.default.yellow('Generating ' + fileName + ' file'));
	    _fs2.default.writeFile(process.cwd() + '/' + fileName, generateMainFileString(), function (err) {
	      if (err) {
	        console.log(_chalk2.default.red('✖') + ' There was an error generating ' + fileName + ' file: ' + err);
	        reject();
	      } else {
	        console.log(_chalk2.default.green('✔') + ' Successfully generated ' + fileName + ' file.');
	        resolve();
	      }
	    });
	  });
	}

	module.exports = createMainFile;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = createTravisFile;

	var _fs = __webpack_require__(1);

	var _fs2 = _interopRequireDefault(_fs);

	var _chalk = __webpack_require__(4);

	var _chalk2 = _interopRequireDefault(_chalk);

	var _bluebird = __webpack_require__(12);

	var _bluebird2 = _interopRequireDefault(_bluebird);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function generateTravisString() {
	  return 'language: node_js\nnode_js:\n  - \'6.2.1\'\n';
	}

	function createTravisFile(pkg) {
	  return new _bluebird2.default(function (resolve, reject) {
	    console.log('' + _chalk2.default.yellow('Generating .travis.yml file'));
	    _fs2.default.writeFile(process.cwd() + '/.travis.yml', generateTravisString(), function (err) {
	      if (err) {
	        console.log(_chalk2.default.red('✖') + ' There was an error generating .travis.yml file: ' + err);
	        reject();
	      } else {
	        console.log(_chalk2.default.green('✔') + ' Successfully generated .travis.yml file.');
	        resolve();
	      }
	    });
	  });
	}

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = createAvaTestFile;

	var _fs = __webpack_require__(1);

	var _fs2 = _interopRequireDefault(_fs);

	var _chalk = __webpack_require__(4);

	var _chalk2 = _interopRequireDefault(_chalk);

	var _bluebird = __webpack_require__(12);

	var _bluebird2 = _interopRequireDefault(_bluebird);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function generateAvaTestFileString(pkg) {
	  return 'import test from \'ava\';\nimport ' + pkg.name + ' from \'./dist\'\n\ntest(t => {\n    t.deepEqual([1, 2], [1, 2]);\n});\n';
	}

	function createAvaTestFile(pkg) {
	  return new _bluebird2.default(function (resolve, reject) {
	    console.log('' + _chalk2.default.yellow('Generating test.js file'));
	    _fs2.default.writeFile(process.cwd() + '/test.js', generateAvaTestFileString(pkg), function (err) {
	      if (err) {
	        console.log(_chalk2.default.red('✖') + ' There was an error generating test.js file: ' + err);
	        reject();
	      } else {
	        console.log(_chalk2.default.green('✔') + ' Successfully generated test.js file.');
	        resolve();
	      }
	    });
	  });
	}

	module.exports = createAvaTestFile;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = createTravisProj;

	var _chalk = __webpack_require__(4);

	var _chalk2 = _interopRequireDefault(_chalk);

	var _bluebird = __webpack_require__(12);

	var _bluebird2 = _interopRequireDefault(_bluebird);

	var _child_process = __webpack_require__(11);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function createTravisProj(githubUsername, repo) {
	  return new _bluebird2.default(function (resolve, reject) {
	    console.log('' + _chalk2.default.yellow('Logging into Travis'));
	    // What if user doesn't have the travis command line?
	    (0, _child_process.exec)('travis login --github-token=' + process.env['GITHUB_TOKEN'], function (error, stdout, stderr) {
	      console.log(stdout);
	      if (error) {
	        console.log(_chalk2.default.red('✖') + ' There was an error logging into Travis: ' + error);
	      } else {
	        console.log(_chalk2.default.green('✔') + ' Successfully logged into Travis');
	        console.log('' + _chalk2.default.yellow('Adding project to Travis'));
	        (0, _child_process.exec)('travis enable -r ' + githubUsername + '/' + repo, function (error, stdout, stderr) {
	          console.log(stdout);
	          if (error) {
	            console.log(_chalk2.default.red('✖') + ' There was an error adding project to Travis: ' + error);
	            reject();
	          } else {
	            console.log(_chalk2.default.green('✔') + ' Succesfully added project to Travis.');
	            resolve();
	          }
	        });
	      }
	    });
	  });
	}

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = createGithubRepo;

	var _chalk = __webpack_require__(4);

	var _chalk2 = _interopRequireDefault(_chalk);

	var _bluebird = __webpack_require__(12);

	var _bluebird2 = _interopRequireDefault(_bluebird);

	var _github = __webpack_require__(26);

	var _github2 = _interopRequireDefault(_github);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var github = new _github2.default();

	function createGithubRepo(name, opts) {
	  return new _bluebird2.default(function (resolve, reject) {
	    console.log('' + _chalk2.default.yellow('Creating Github repository'));
	    opts = opts || {};
	    if (!name) {
	      console.log(_chalk2.default.red('✖') + ' Error creating repo: name was not provided');
	      reject();
	    }
	    if (!opts.token) {
	      console.log(_chalk2.default.red('✖') + ' Error creating repo: oauth token was not provided');
	      reject();
	    }

	    github.authenticate({
	      type: 'oauth',
	      token: opts.token
	    });

	    github.repos.create({
	      name: name
	    }, function (error, res) {
	      if (error) {
	        console.log(_chalk2.default.red('✖') + ' Error creating repo: ' + error);
	        reject();
	      }
	      console.log(_chalk2.default.green('✔') + ' Successfully created repo: ' + name);
	      resolve();
	    });
	  });
	}

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = require("github");

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = createGitignoreFile;

	var _fs = __webpack_require__(1);

	var _fs2 = _interopRequireDefault(_fs);

	var _chalk = __webpack_require__(4);

	var _chalk2 = _interopRequireDefault(_chalk);

	var _bluebird = __webpack_require__(12);

	var _bluebird2 = _interopRequireDefault(_bluebird);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function generateGitignoreString(pkg) {
	  return 'node_modules';
	}

	function createGitignoreFile() {
	  return new _bluebird2.default(function (resolve, reject) {
	    console.log('' + _chalk2.default.yellow('Generating .gitignore file'));
	    _fs2.default.writeFile(process.cwd() + '/.gitignore', generateGitignoreString(), function (err) {
	      if (err) {
	        console.log(_chalk2.default.red('✖') + ' There was an error generating .gitignore file: ' + err);
	        reject();
	      } else {
	        console.log(_chalk2.default.green('✔') + ' Successfully generated .gitignore file.');
	        resolve();
	      }
	    });
	  });
	}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = installDependencies;

	var _chalk = __webpack_require__(4);

	var _chalk2 = _interopRequireDefault(_chalk);

	var _bluebird = __webpack_require__(12);

	var _bluebird2 = _interopRequireDefault(_bluebird);

	var _child_process = __webpack_require__(11);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function installDependencies() {
	  return new _bluebird2.default(function (resolve, reject) {
	    console.log('' + _chalk2.default.yellow('Installing dependencies...'));
	    (0, _child_process.exec)('npm install', function (error, stdout, stderr) {
	      console.log(stdout);
	      if (error) {
	        console.log(_chalk2.default.red('✖') + ' There was an error installing dependencies: ' + error);
	        reject();
	      } else {
	        console.log(_chalk2.default.green('✔') + ' Successfully installed dependencies');
	        resolve();
	      }
	    });
	  });
	}

/***/ },
/* 29 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getFileNameFromPath;
	function getFileNameFromPath(projectPath) {
	  var fileName = '';
	  if (projectPath[projectPath.length - 1] === '/') {
	    fileName = projectPath.substring(0, projectPath.length - 1);
	  } else {
	    fileName = projectPath.split('/').pop();
	  }
	  return fileName;
	}

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = configureNpmBetterInit;

	var _fs = __webpack_require__(1);

	var _fs2 = _interopRequireDefault(_fs);

	var _path = __webpack_require__(2);

	var _path2 = _interopRequireDefault(_path);

	var _chalk = __webpack_require__(4);

	var _chalk2 = _interopRequireDefault(_chalk);

	var _bluebird = __webpack_require__(12);

	var _bluebird2 = _interopRequireDefault(_bluebird);

	var _parseArgv = __webpack_require__(7);

	var _parseArgv2 = _interopRequireDefault(_parseArgv);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function configureNpmBetterInit(commandLineArgs) {
	  return new _bluebird2.default(function (resolve, reject) {
	    var configArgs = commandLineArgs.slice(1);
	    var configArgv = (0, _parseArgv2.default)(configArgs);
	    var githubUsername = configArgv['github-username'];
	    var githubToken = configArgv['github-token'];
	    // For dotevn, duplicated in the main file (npmBetterInit.js)
	    // TODO: refactor this and the instance in npmBetterInit
	    var envFilePath = '';
	    if (_path2.default.resolve(__dirname).split('/').pop() === 'dist') {
	      envFilePath = _path2.default.resolve(__dirname + '/../.env');
	    } else {
	      envFilePath = _path2.default.resolve(__dirname + '/.env');
	    }

	    if (githubUsername) {
	      try {
	        _fs2.default.appendFile(envFilePath, 'GITHUB_USERNAME=' + githubUsername + '\n', function () {
	          console.log(_chalk2.default.green('✔') + ' Your Github token has been saved.');
	          resolve();
	        });
	      } catch (error) {
	        console.log(_chalk2.default.red('✖') + ' There was an error saving your Github username: ' + error);
	        reject();
	      } finally {}
	    }
	    if (githubToken) {
	      try {
	        _fs2.default.appendFile(envFilePath, 'GITHUB_TOKEN=' + githubToken + '\n', function () {
	          console.log(_chalk2.default.green('✔') + ' Your Github token has been saved.');
	          resolve();
	        });
	      } catch (error) {
	        console.log(_chalk2.default.red('✖') + ' There was an error saving your Github token: ' + error);
	        reject();
	      } finally {}
	    }
	  });
	}

/***/ }
/******/ ]);