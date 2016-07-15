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

	var _getFileNameFromPath = __webpack_require__(36);

	var _getFileNameFromPath2 = _interopRequireDefault(_getFileNameFromPath);

	var _configureNpmBetterInit = __webpack_require__(37);

	var _configureNpmBetterInit2 = _interopRequireDefault(_configureNpmBetterInit);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// dotevn configuration ======
	// 3rd party dependencies
	var envFilePath = '';

	// Imports

	if (_path2.default.resolve(__dirname).split('/').pop() === 'dist') {
	  envFilePath = _path2.default.resolve(__dirname, '..', '.env');
	} else {
	  envFilePath = _path2.default.resolve(__dirname, '.env');
	}
	_dotenv2.default.config({ // This actually loads the .env variables into the ENV
	  path: envFilePath,
	  silent: true
	});

	// Parse command line options
	var args = process.argv.slice(2);
	var argv = (0, _parseArgv2.default)(args, {
	  usage: '$ npm-better-init <input>',
	  options: [{
	    flag: 'type',
	    alias: 't',
	    description: 'Specify type of project (i.e es6, react)'
	  }, {
	    flag: 'github',
	    alias: 'g',
	    description: 'Create github repo'
	  }, {
	    flag: 'github-token',
	    alias: 't',
	    description: 'Adds github token (must be used with config: $ config --github-token)'
	  }, {
	    flag: 'github-username',
	    alias: 'u',
	    description: 'Adds github username (must be used with config: $ config --github-username)'
	  }],
	  examples: [{
	    usage: '$ npm-better-init tmp/app -g',
	    output: ''
	  }]
	});

	// // Set variables
	// if (argv['help'] || argv['h']) {
	//   argv.help()
	//   process.exit()
	// }
	var isCli = argv['type'] === 'cli';
	var isReact = argv['type'] === 'react';
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
	} else {
	  if (providedProjectPath) {
	    (0, _pify2.default)(_mkdirp2.default)(projectPath).then(function () {
	      process.chdir(projectPath);
	      (0, _npmBetterInit2.default)(projectName, projectPath, isCli, isReact, shouldCreateGithubRepo, {
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
	    (0, _npmBetterInit2.default)(projectName, projectPath, isCli, isReact, shouldCreateGithubRepo, {
	      github: {
	        token: process.env['GITHUB_TOKEN'],
	        username: process.env['GITHUB_USERNAME']
	      }
	    });
	  }
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

	var _getQuestions = __webpack_require__(17);

	var _getQuestions2 = _interopRequireDefault(_getQuestions);

	var _createReadme = __webpack_require__(18);

	var _createReadme2 = _interopRequireDefault(_createReadme);

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

	var _createBabelrc = __webpack_require__(29);

	var _createBabelrc2 = _interopRequireDefault(_createBabelrc);

	var _createMainCssFile = __webpack_require__(30);

	var _createMainCssFile2 = _interopRequireDefault(_createMainCssFile);

	var _createExampleHTMLFile = __webpack_require__(31);

	var _createExampleHTMLFile2 = _interopRequireDefault(_createExampleHTMLFile);

	var _multiPromptNode = __webpack_require__(32);

	var _multiPromptNode2 = _interopRequireDefault(_multiPromptNode);

	var _pify = __webpack_require__(3);

	var _pify2 = _interopRequireDefault(_pify);

	var _mkdirp = __webpack_require__(5);

	var _mkdirp2 = _interopRequireDefault(_mkdirp);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function npmBetterInit(projectName, projectDirectory, isCli, isReact, shouldCreateGithubRepo) {
	  var _this = this;

	  var opts = arguments.length <= 5 || arguments[5] === undefined ? {} : arguments[5];

	  opts.github = opts.github || {};
	  generatePackageString({
	    projectName: projectName,
	    projectDirectory: projectDirectory,
	    isCli: isCli,
	    isReact: isReact,
	    githubUsername: opts.github.username
	  }).then(function (pkg) {
	    var packageFilePath = process.cwd() + '/package.json';
	    _jsonfile2.default.writeFile(packageFilePath, pkg, { spaces: 2 }, function (err) {});

	    var repoName = pkg.repository.split('/').pop();

	    (0, _createTravisFile2.default)().then(_createMainFile2.default.bind(_this, { cli: isCli, isReact: isReact })).then(_createGitignoreFile2.default).then(_createAvaTestFile2.default.bind(_this, pkg, { isReact: isReact })).then(_createReadme2.default.bind(_this, 'npm', {
	      cli: isCli,
	      react: isReact,
	      repo: pkg.repository,
	      projectName: pkg.name,
	      description: pkg.description,
	      moduleName: pkg.name,
	      author: {
	        name: pkg.author.name
	      }
	    })).then(function () {
	      return new Promise(function (resolve, reject) {
	        if (!isReact) {
	          resolve();
	        } else {
	          (0, _createBabelrc2.default)().then(_createMainCssFile2.default).then(resolve).catch(function (e) {
	            console.log(e);
	          });
	        }
	      });
	    }).then(function () {
	      return new Promise(function (resolve, reject) {
	        if (!isReact) {
	          resolve();
	        } else {
	          console.log('dog');
	          console.log(projectDirectory);
	          (0, _pify2.default)(_mkdirp2.default)(projectDirectory + "/examples").then(function () {
	            (0, _createExampleHTMLFile2.default)().then(resolve).catch(function (e) {
	              console.log(e);
	            });
	          }).catch(function (e) {
	            console.log(e);
	          });
	        }
	      });
	    }).then(_createGit2.default.bind(_this, projectDirectory)).then(function () {
	      return new Promise(function (resolve, reject) {
	        if (!shouldCreateGithubRepo) {
	          resolve();
	        } else {
	          (0, _createGithubRepo2.default)(projectName, {
	            username: opts.github.username,
	            token: opts.github.token
	          }).then(_addGitRemote2.default.bind(_this, opts.github.username, repoName)).then(_createTravisProj2.default.bind(_this, opts.github.username, repoName)).then(resolve).catch(function (e) {
	            console.log(e);
	          });
	        }
	      });
	    }).then(_installDependencies2.default).catch(function (e) {
	      throw new Error(e);
	    });
	  });
	}

	function generatePackageString() {
	  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  var projectName = _ref.projectName;
	  var projectDirectory = _ref.projectDirectory;
	  var isCli = _ref.isCli;
	  var isReact = _ref.isReact;
	  var githubUsername = _ref.githubUsername;

	  return new Promise(function (resolve, reject) {
	    var questions = (0, _getQuestions2.default)(githubUsername, projectName, isCli, isReact);

	    process.stdout.write('\n');
	    new _multiPromptNode2.default(questions).begin().then(function (results) {
	      process.stdout.write('\n');
	      var pkg = {};
	      pkg.name = results.moduleName.answer;
	      pkg.version = results.version.answer;
	      pkg.description = results.description.answer;
	      pkg.repository = results.githubRepoName.answer;
	      pkg.main = results.entry.answer;
	      pkg.scripts = {};
	      pkg.scripts.test = results.testCommand.answer;
	      pkg.keywords = results.keywords.answer;
	      pkg.author = {};
	      pkg.author.name = results.authorName.answer;
	      pkg.author.email = results.authorEmail.answer;
	      pkg.author.url = results.authorUrl.answer;
	      pkg.license = results.license.answer;
	      pkg.devDependencies = results.devDependencies.answer;
	      pkg.dependencies = results.dependencies.answer;
	      pkg.scripts = {};
	      pkg.scripts.prepublish = 'npm run build';
	      // build command
	      if (isCli) {
	        pkg.scripts.build = './node_modules/distify-cli/cli.js --input-file=./cli.js --output-dir=./dist --is-node --is-cli';
	      } else if (isReact) {
	        pkg.scripts.build = './node_modules/distify-cli/cli.js --input-file=./index.jsx --output-dir=./dist --is-react --is-module';
	        pkg.ava = {
	          require: ['babel-register'],
	          babel: 'inherit'
	        };
	        pkg.scripts['dev-server'] = './node_modules/@joegesualdo/react-server-cli/cli.js --entry=./index.jsx --output=assets/bundle.js';
	        pkg.scripts['server'] = './node_modules/@joegesualdo/react-server-cli/cli.js --entry=./dist/index.js --output=assets/bundle.js';
	      } else {
	        pkg.scripts.build = './node_modules/distify-cli/cli.js --input-file=./index.js --output-dir=./dist --is-node';
	      }
	      resolve(pkg);
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

	var _terminalLog = __webpack_require__(12);

	var _terminalLog2 = _interopRequireDefault(_terminalLog);

	var _indentString = __webpack_require__(13);

	var _indentString2 = _interopRequireDefault(_indentString);

	var _terminalSpinnerNode = __webpack_require__(14);

	var _terminalSpinnerNode2 = _interopRequireDefault(_terminalSpinnerNode);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function createGit(projectPath) {
	  return new Promise(function (resolve, reject) {
	    var spinner = new _terminalSpinnerNode2.default({
	      text: 'Setting up git',
	      color: 'green'
	    });
	    spinner.begin();
	    process.chdir(projectPath);
	    (0, _child_process.exec)("git init", function (error, stdout, stderr) {
	      (0, _child_process.exec)("git add .", function (error, stdout, stderr) {
	        (0, _child_process.exec)("git commit -m 'Initial Commit'", function (error, stdout, stderr) {
	          spinner.stop();
	          _terminalLog2.default.success('Setup git', 2);
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
/***/ function(module, exports, __webpack_require__) {

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

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});

		var _chalk = __webpack_require__(1);

		var _chalk2 = _interopRequireDefault(_chalk);

		var _indentString = __webpack_require__(2);

		var _indentString2 = _interopRequireDefault(_indentString);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		var log = {
		  warn: function warn(message) {
		    var indent = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

		    process.stdout.write((0, _indentString2.default)(_chalk2.default.yellow('⚠') + ' ' + message + '\n', indent));
		  },
		  error: function error(message) {
		    var indent = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

		    process.stdout.write((0, _indentString2.default)(_chalk2.default.red('✖') + ' ' + message + '\n', indent));
		  },
		  success: function success(message) {
		    var indent = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

		    process.stdout.write((0, _indentString2.default)(_chalk2.default.green('✔') + ' ' + message + '\n', indent));
		  },
		  created: function created(name) {
		    var indent = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

		    process.stdout.write((0, _indentString2.default)(_chalk2.default.green('create') + ' ' + name + '\n', indent));
		  }
		};

		exports.default = log;

	/***/ },
	/* 1 */
	/***/ function(module, exports) {

		module.exports = __webpack_require__(4);

	/***/ },
	/* 2 */
	/***/ function(module, exports) {

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
		/***/ function(module, exports) {

			'use strict';

			Object.defineProperty(exports, "__esModule", {
			  value: true
			});

			var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

			var assert = {
			  type: function type(val, _type) {
			    if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) !== _type) {
			      throw new TypeError('Expected \'' + val + '\' to be a \'' + _type + '\', got \'' + (typeof val === 'undefined' ? 'undefined' : _typeof(val)) + '\'');
			    }
			  }
			};

			function isEmptyLine(str) {
			  assert.type(str, 'string');

			  var emptyCharacters = ['\n', ' '];

			  return str.split('').every(function (ch) {
			    return emptyCharacters.indexOf(ch) !== -1;
			  });
			}

			exports.default = function (str) {
			  var count = arguments.length <= 1 || arguments[1] === undefined ? 2 : arguments[1];
			  var character = arguments.length <= 2 || arguments[2] === undefined ? ' ' : arguments[2];

			  assert.type(str, 'string');
			  assert.type(character, 'string');

			  return str.split('\n').map(function (line) {
			    if (isEmptyLine(line)) return line;
			    return '' + character.repeat(count) + line;
			  }).join('\n');
			};

		/***/ }
		/******/ ]);

	/***/ }
	/******/ ]);

/***/ },
/* 13 */
/***/ function(module, exports) {

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
	/***/ function(module, exports) {

		'use strict';

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});

		var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

		var assert = {
		  type: function type(val, _type) {
		    if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) !== _type) {
		      throw new TypeError('Expected \'' + val + '\' to be a \'' + _type + '\', got \'' + (typeof val === 'undefined' ? 'undefined' : _typeof(val)) + '\'');
		    }
		  }
		};

		function isEmptyLine(str) {
		  assert.type(str, 'string');

		  var emptyCharacters = ['\n', ' '];

		  return str.split('').every(function (ch) {
		    return emptyCharacters.indexOf(ch) !== -1;
		  });
		}

		exports.default = function (str) {
		  var count = arguments.length <= 1 || arguments[1] === undefined ? 2 : arguments[1];
		  var character = arguments.length <= 2 || arguments[2] === undefined ? ' ' : arguments[2];

		  assert.type(str, 'string');
		  assert.type(character, 'string');

		  return str.split('\n').map(function (line) {
		    if (isEmptyLine(line)) return line;
		    return '' + character.repeat(count) + line;
		  }).join('\n');
		};

	/***/ }
	/******/ ]);

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

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

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});

		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

		var _chalk = __webpack_require__(1);

		var _chalk2 = _interopRequireDefault(_chalk);

		var _hideTerminalCursor = __webpack_require__(2);

		var _hideTerminalCursor2 = _interopRequireDefault(_hideTerminalCursor);

		var _showTerminalCursor = __webpack_require__(3);

		var _showTerminalCursor2 = _interopRequireDefault(_showTerminalCursor);

		var _indentString = __webpack_require__(4);

		var _indentString2 = _interopRequireDefault(_indentString);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

		// Constants
		var defaultFrames = ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷'];
		var defaultColor = 'white';

		// Main

		var TerminalSpinner = function () {
		  function TerminalSpinner(_ref) {
		    var _ref$frames = _ref.frames;
		    var frames = _ref$frames === undefined ? defaultFrames : _ref$frames;
		    var _ref$text = _ref.text;
		    var text = _ref$text === undefined ? '' : _ref$text;
		    var _ref$indent = _ref.indent;
		    var indent = _ref$indent === undefined ? 2 : _ref$indent;
		    var _ref$interval = _ref.interval;
		    var interval = _ref$interval === undefined ? 80 : _ref$interval;
		    var _ref$color = _ref.color;
		    var color = _ref$color === undefined ? defaultColor : _ref$color;

		    _classCallCheck(this, TerminalSpinner);

		    this.text = text;
		    this.frames = frames;
		    this.onDone = function () {};
		    this.interval = interval;
		    this.intervalFn = undefined;
		    this.indent = indent;
		    this.color = color;
		  }

		  _createClass(TerminalSpinner, [{
		    key: 'on',
		    value: function on(type, fn) {
		      if (type === 'done') {
		        this.onDone = fn;
		      }
		    }
		  }, {
		    key: 'begin',
		    value: function begin() {
		      var _this = this;

		      return new Promise(function (resolve) {
		        (0, _hideTerminalCursor2.default)();
		        function onSigint() {
		          (0, _showTerminalCursor2.default)();
		          process.exit();
		        }
		        process.on('SIGINT', onSigint);
		        var count = 0;
		        _this.intervalFn = setInterval(function () {
		          process.stdout.clearLine();
		          process.stdout.cursorTo(0);
		          var color = _chalk2.default[_this.color] === undefined ? defaultColor : _this.color;
		          process.stdout.write((0, _indentString2.default)(_chalk2.default[color](_this.frames[count % _this.frames.length]) + ' ' + _this.text, _this.indent));
		          count++;
		        }, _this.interval);
		        resolve();
		      });
		    }
		  }, {
		    key: 'stop',
		    value: function stop() {
		      var _this2 = this;

		      return new Promise(function (resolve) {
		        clearInterval(_this2.intervalFn);
		        var finishedText = _this2.onDone();
		        process.stdout.clearLine();
		        process.stdout.cursorTo(0);
		        if (finishedText) {
		          process.stdout.write(finishedText + '\n');
		        }
		        (0, _showTerminalCursor2.default)();
		        resolve();
		      });
		    }
		  }, {
		    key: 'changeText',
		    value: function changeText(text) {
		      this.text = text;
		    }
		  }]);

		  return TerminalSpinner;
		}();

		exports.default = TerminalSpinner;

	/***/ },
	/* 1 */
	/***/ function(module, exports) {

		module.exports = __webpack_require__(4);

	/***/ },
	/* 2 */
	/***/ function(module, exports) {

		module.exports = __webpack_require__(15);

	/***/ },
	/* 3 */
	/***/ function(module, exports) {

		module.exports = __webpack_require__(16);

	/***/ },
	/* 4 */
	/***/ function(module, exports) {

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

			Object.defineProperty(exports, "__esModule", {
			  value: true
			});

			var _assert = __webpack_require__(1);

			var _assert2 = _interopRequireDefault(_assert);

			var _isEmptyLine = __webpack_require__(2);

			var _isEmptyLine2 = _interopRequireDefault(_isEmptyLine);

			function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

			exports.default = function (str) {
			  var count = arguments.length <= 1 || arguments[1] === undefined ? 2 : arguments[1];
			  var character = arguments.length <= 2 || arguments[2] === undefined ? ' ' : arguments[2];

			  _assert2.default.type(str, 'string');
			  _assert2.default.type(character, 'string');

			  return str.split('\n').map(function (line) {
			    if ((0, _isEmptyLine2.default)(line)) return line;
			    return '' + character.repeat(count) + line;
			  }).join('\n');
			};

		/***/ },
		/* 1 */
		/***/ function(module, exports) {

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
			/***/ function(module, exports) {

				"use strict";

				Object.defineProperty(exports, "__esModule", {
				  value: true
				});

				var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

				exports.default = {
				  type: function type(val, _type) {
				    if ((typeof val === "undefined" ? "undefined" : _typeof(val)) !== _type) {
				      throw new TypeError("Expected '" + val + "' to be a '" + _type + "', got '" + (typeof val === "undefined" ? "undefined" : _typeof(val)) + "'");
				    }
				  }
				};

			/***/ }
			/******/ ]);

		/***/ },
		/* 2 */
		/***/ function(module, exports) {

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
			/***/ function(module, exports) {

				'use strict';

				Object.defineProperty(exports, "__esModule", {
				  value: true
				});

				var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

				var assert = {
				  type: function type(val, _type) {
				    if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) !== _type) {
				      throw new TypeError('Expected \'' + val + '\' to be a \'' + _type + '\', got \'' + (typeof val === 'undefined' ? 'undefined' : _typeof(val)) + '\'');
				    }
				  }
				};

				exports.default = function (str) {
				  assert.type(str, 'string');

				  var emptyCharacters = ['\n', ' '];

				  return str.split('').every(function (ch) {
				    return emptyCharacters.indexOf(ch) !== -1;
				  });
				};

			/***/ }
			/******/ ]);

		/***/ }
		/******/ ]);

	/***/ }
	/******/ ]);

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("hide-terminal-cursor");

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("show-terminal-cursor");

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getQuestions;

	var _chalk = __webpack_require__(4);

	var _chalk2 = _interopRequireDefault(_chalk);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getQuestions(username, projectName, isCli, isReact) {
	  var questions = [{
	    identifier: 'moduleName',
	    prompt: _chalk2.default.green('?') + ' What do you want to name your module? (' + projectName + ')',
	    onDone: function onDone(answer, pkg) {
	      return answer || projectName;
	    }
	  }, {
	    identifier: 'githubRepoName',
	    prompt: _chalk2.default.green('?') + ' What do you want to name your github repo? (' + username + '/' + projectName + ')',
	    onDone: function onDone(answer, pkg) {
	      if (answer) {
	        return username + '/' + answer;
	      } else {
	        return username + '/' + projectName;
	      }
	    }
	  }, {
	    identifier: 'version',
	    prompt: _chalk2.default.green('?') + ' What version is it? (0.0.1)',
	    onDone: function onDone(answer, pkg) {
	      return answer || "0.0.1";
	    }
	  }, {
	    identifier: 'description',
	    prompt: _chalk2.default.green('?') + ' What is a description of this module?',
	    onDone: function onDone(answer, pkg) {
	      return answer;
	    }
	  }, {
	    identifier: 'entry',
	    prompt: _chalk2.default.green('?') + ' What file should be used for the entry point? (' + (isCli ? './dist/cli.js' : './dist/index.js') + ')',
	    onDone: function onDone(answer, pkg) {
	      var a = void 0;
	      if (isCli) {
	        a = answer || './dist/cli.js';
	      } else {
	        a = answer || './dist/index.js';
	      }
	      return a;
	    }
	  }, {
	    identifier: 'testCommand',
	    prompt: _chalk2.default.green('?') + ' What is the test command? ($ ' + (isReact ? 'ava-react test.js' : 'ava test.js') + ')',
	    onDone: function onDone(answer, pkg) {
	      var defaultCommand = 'npm run build && ./node_modules/ava/cli.js -v test.js';
	      if (isReact) {
	        defaultCommand = './node_modules/@joegesualdo/ava-react/cli.js test.js';
	      }
	      return answer || defaultCommand;
	    }
	  }, {
	    identifier: 'keywords',
	    prompt: _chalk2.default.green('?') + ' What keywords describe this module?',
	    onDone: function onDone(answer, pkg) {
	      // split and remove empty strings
	      return answer.split(',').filter(function (e) {
	        return e;
	      });
	    }
	  }, {
	    identifier: 'authorName',
	    prompt: _chalk2.default.green('?') + ' What\'s the author\'s name',
	    onDone: function onDone(answer, pkg) {
	      return answer;
	    }
	  }, {
	    identifier: 'authorEmail',
	    prompt: _chalk2.default.green('?') + ' What\'s the author\'s email',
	    onDone: function onDone(answer, pkg) {
	      return answer;
	    }
	  }, {
	    identifier: 'authorUrl',
	    prompt: _chalk2.default.green('?') + ' What\'s the author\'s url?',
	    onDone: function onDone(answer, pkg) {
	      return answer;
	    }
	  }, {
	    identifier: 'license',
	    prompt: _chalk2.default.green('?') + ' What license do you want to include? (MIT)',
	    onDone: function onDone(answer, pkg) {
	      return answer || 'MIT';
	    }
	  }, {
	    identifier: 'devDependencies',
	    prompt: _chalk2.default.green('?') + ' What are the devDependencies?',
	    onDone: function onDone(answer, pkg) {
	      var devDependencies = {};
	      // split and remove empty strings
	      answer.split(",").filter(function (e) {
	        return e;
	      }).forEach(function (dep) {
	        devDependencies[dep] = '*';
	      });
	      devDependencies['ava'] = '^0.15.2';
	      devDependencies['distify-cli'] = '0.0.13';
	      if (isReact) {
	        devDependencies['react-addons-test-utils'] = "^15.1.0";
	        devDependencies['@joegesualdo/react-server-cli'] = "0.0.2";
	        devDependencies['enzyme'] = "^2.3.0";
	        devDependencies['@joegesualdo/ava-react'] = "^0.0.4";
	      }
	      return devDependencies;
	    }
	  }, {
	    identifier: 'dependencies',
	    prompt: _chalk2.default.green('?') + ' What are the dependencies?',
	    onDone: function onDone(answer, pkg) {
	      var dependencies = {};
	      // split and remove empty strings
	      answer.split(',').filter(function (e) {
	        return e;
	      }).forEach(function (dep) {
	        dependencies[dep] = '*';
	      });
	      if (isReact) {
	        dependencies['react'] = "^15.1.0";
	        dependencies['react-dom'] = "^15.1.0";
	      }
	      return dependencies;
	    }
	  }];

	  if (isCli) {
	    questions.push({
	      identifier: 'executable',
	      prompt: _chalk2.default.green('?') + ' What do you want the cli exectable to be? (' + projectName + ')',
	      onDone: function onDone(answer, pkg) {
	        var bin = {};
	        var name = answer || projectName;
	        bin[name] = './dist/cli.js';
	        return bin;
	      }
	    });
	  }
	  return questions;
	}

/***/ },
/* 18 */
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

	var _convertToCamelcase = __webpack_require__(19);

	var _convertToCamelcase2 = _interopRequireDefault(_convertToCamelcase);

	var _terminalLog = __webpack_require__(12);

	var _terminalLog2 = _interopRequireDefault(_terminalLog);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function generateNPMReadmeString(opts) {
	  return new Promise(function (resolve, reject) {
	    opts = opts || {};
	    opts.cli = opts.cli || false;
	    // opts.projectName =
	    // opts.npmModuleName
	    // opts.npmModuleName

	    var str = '## ' + opts.projectName + ' [![Build Status](https://travis-ci.org/' + opts.repo + '.svg?branch=master)](https://travis-ci.org/' + opts.repo + ')\n> ' + opts.description + '\n\n## Highlights\n\n- Highlight 1\n- Highlight 2\n- Highlight 3\n\n## Install\n```\n$ npm install ' + (opts.cli ? '--global' : '--save') + ' ' + opts.moduleName + ' \n```\n\n## Usage\n```javascript\n' + (opts.cli ? '$ ' + opts.moduleName : 'var ' + (0, _convertToCamelcase2.default)(opts.moduleName) + ' = require("' + (0, _convertToCamelcase2.default)(opts.projectName) + '").default') + '\n\n// insert code example here\n```\n\n## Test\n```\n$ npm test\n```\n';
	    if (opts.cli) {} else {
	      str += '## API\n### `methodName(arg1, arg2)`\n> What does this method do?\n\n| Name | Type | Description |\n|------|------|-------------|\n| arg1 | `Array` | Test description|\n| arg2 | `String` | Test description|\n\nReturns: `Array`, of things\n\n```javascript\nvar ' + (0, _convertToCamelcase2.default)(opts.projectName) + ' = require("' + opts.moduleName + '").default\n\n// insert method example here\n```\n';
	    }

	    str += '## Build\n```\n$ npm run build\n```\n\n## Related\n- [example-package]() - Add description of the example package here.\n\n## License\nMIT © [' + opts.author.name + ']()\n';
	    resolve(str);
	  });
	}

	function createReadme(type, opts) {
	  return new Promise(function (resolve, reject) {
	    opts = opts || {};

	    var readmeString = '';
	    if (type === 'npm') {
	      generateNPMReadmeString(opts).then(function (readmeString) {
	        _fs2.default.writeFile(process.cwd() + '/readme.md', readmeString, function (err) {
	          if (err) {
	            _terminalLog2.default.error('There was an error generating README file: ' + err);
	            reject();
	          } else {
	            _terminalLog2.default.created('readme.md', 2);
	            resolve();
	          }
	        });
	      }).catch(function (e) {
	        console.log(e);
	      });
	    } else {
	      _fs2.default.writeFile(process.cwd() + '/readme.md', readmeString, function (err) {
	        if (err) {
	          _terminalLog2.default.error('There was an error generating README file: ' + err);
	          reject();
	        } else {
	          _terminalLog2.default.created('readme.md', 2);
	          resolve();
	        }
	      });
	    }
	  });
	}

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = require("convert-to-camelcase");

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

	var _child_process = __webpack_require__(11);

	var _terminalLog = __webpack_require__(12);

	var _terminalLog2 = _interopRequireDefault(_terminalLog);

	var _indentString = __webpack_require__(13);

	var _indentString2 = _interopRequireDefault(_indentString);

	var _terminalSpinnerNode = __webpack_require__(14);

	var _terminalSpinnerNode2 = _interopRequireDefault(_terminalSpinnerNode);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function addGitRemote(username, repo) {
	  return new Promise(function (resolve, reject) {
	    var spinner = new _terminalSpinnerNode2.default({
	      text: '',
	      color: 'green'
	    });
	    spinner.begin();
	    (0, _child_process.exec)('git remote add origin git@github.com:' + username + '/' + repo + '.git', function (error, stdout, stderr) {
	      if (error) {
	        spinner.stop();
	        _terminalLog2.default.error('There was an error adding github as origin: ' + error, 2);
	      } else {
	        (0, _child_process.exec)('git push -u origin master', function (error, stdout, stderr) {
	          if (error) {
	            spinner.stop();
	            _terminalLog2.default.error('There was an error pushing code to github origin: ' + error, 2);
	            reject();
	          } else {
	            spinner.stop();
	            _terminalLog2.default.success('Pushed code to Github (github.com/' + username + '/' + repo + ')', 2);
	            resolve();
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

	var _terminalLog = __webpack_require__(12);

	var _terminalLog2 = _interopRequireDefault(_terminalLog);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function generateMainFileString(isReact) {
	  var s = '';
	  if (isReact) {
	    s = 'import React from \'react\';\nimport ReactDOM from \'react-dom\';\nimport style from \'./index.css\';\n\nconst propTypes = {\n};\n\nconst defaultProps = {\n};\n\nclass TestComponent extends React.Component {\n  constructor(props) {\n    super(props);\n\n    this.state = {\n    };\n  }\n\n  render() {\n    return (\n      <span className={style.root}>Meow</span>\n    );\n  }\n}\n\nTestComponent.propTypes = propTypes;\nTestComponent.defaultProps = defaultProps;\n\nexport default TestComponent;\n';
	  } else {}
	  return s;
	}

	function createMainFile(opts) {
	  return new Promise(function (resolve, reject) {
	    opts = opts || {};
	    opts.cli = opts.cli || false;
	    opts.isReact = opts.isReact || false;

	    var fileName = '';
	    if (opts.cli) {
	      fileName = 'cli.js';
	    } else if (opts.isReact) {
	      fileName = 'index.jsx';
	    } else {
	      fileName = 'index.js';
	    }

	    _fs2.default.writeFile(process.cwd() + '/' + fileName, generateMainFileString(opts.isReact), function (err) {
	      if (err) {
	        _terminalLog2.default.error('There was an error generating ' + fileName + ' file: ' + err);
	        reject();
	      } else {
	        _terminalLog2.default.created('' + fileName, 2);
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

	var _terminalLog = __webpack_require__(12);

	var _terminalLog2 = _interopRequireDefault(_terminalLog);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function generateTravisString() {
	  return 'language: node_js\nnode_js:\n  - \'6.2.1\'\n';
	}

	function createTravisFile(pkg) {
	  return new Promise(function (resolve, reject) {
	    _fs2.default.writeFile(process.cwd() + '/.travis.yml', generateTravisString(), function (err) {
	      if (err) {
	        _terminalLog2.default.error('There was an error generating .travis.yml file: ' + err);
	        reject();
	      } else {
	        _terminalLog2.default.created('.travis.yml', 2);
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

	var _terminalLog = __webpack_require__(12);

	var _terminalLog2 = _interopRequireDefault(_terminalLog);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function generateAvaTestFileString(pkg, isReact) {
	  var s = '';
	  if (isReact) {
	    s = 'import React from \'react\';\nimport TestComponent from \'./index.jsx\';\nimport style from \'./index.css\';\nimport test from \'ava\';\nimport { shallow } from \'enzyme\';\n\ntest(\'root tag is an input\', t => {\n  const wrapper = shallow(<TestComponent />);\n  t.is(wrapper.type(), \'span\');\n});\n\ntest(\'root class is applied\', t => {\n  const wrapper = shallow(<TestComponent />);\n  t.true(wrapper.hasClass(style.root));\n});\n';
	  } else {
	    s = 'import test from \'ava\';\nimport ' + pkg.name + ' from \'./dist\'\n\ntest(t => {\n    t.deepEqual([1, 2], [1, 2]);\n});';
	  }
	  return s;
	}

	function createAvaTestFile(pkg, opts) {
	  opts = opts || {};
	  opts.isReact = opts.isReact || false;
	  return new Promise(function (resolve, reject) {
	    _fs2.default.writeFile(process.cwd() + '/test.js', generateAvaTestFileString(pkg, opts.isReact), function (err) {
	      if (err) {
	        _terminalLog2.default.error('There was an error generating test.js file: ' + err);
	        reject();
	      } else {
	        _terminalLog2.default.created('test.js', 2);
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

	var _child_process = __webpack_require__(11);

	var _terminalLog = __webpack_require__(12);

	var _terminalLog2 = _interopRequireDefault(_terminalLog);

	var _indentString = __webpack_require__(13);

	var _indentString2 = _interopRequireDefault(_indentString);

	var _terminalSpinnerNode = __webpack_require__(14);

	var _terminalSpinnerNode2 = _interopRequireDefault(_terminalSpinnerNode);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function createTravisProj(githubUsername, repo) {
	  return new Promise(function (resolve, reject) {
	    var spinner = new _terminalSpinnerNode2.default({
	      text: 'Setting up travis',
	      color: 'green'
	    });
	    spinner.begin();
	    // What if user doesn't have the travis command line?
	    (0, _child_process.exec)('travis login --github-token=' + process.env['GITHUB_TOKEN'], function (error, stdout, stderr) {
	      if (error) {
	        spinner.stop();
	        _terminalLog2.default.error('There was an error logging into Travis: ' + error, 2);
	      } else {
	        (0, _child_process.exec)('travis enable -r ' + githubUsername + '/' + repo, function (error, stdout, stderr) {
	          if (error) {
	            spinner.stop();
	            _terminalLog2.default.error('There was an error adding project to Travis: ' + error, 2);
	            reject();
	          } else {
	            spinner.stop();
	            _terminalLog2.default.success('Added project to Travis.', 2);
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

	var _github = __webpack_require__(26);

	var _github2 = _interopRequireDefault(_github);

	var _terminalLog = __webpack_require__(12);

	var _terminalLog2 = _interopRequireDefault(_terminalLog);

	var _indentString = __webpack_require__(13);

	var _indentString2 = _interopRequireDefault(_indentString);

	var _terminalSpinnerNode = __webpack_require__(14);

	var _terminalSpinnerNode2 = _interopRequireDefault(_terminalSpinnerNode);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var github = new _github2.default();

	function createGithubRepo(name, opts) {
	  return new Promise(function (resolve, reject) {
	    var spinner = new _terminalSpinnerNode2.default({
	      text: 'Creating Github repo',
	      color: 'green'
	    });
	    spinner.begin();
	    opts = opts || {};
	    if (!name) {
	      spinner.stop();
	      _terminalLog2.default.error('Error creating Github repo: name was not provided', 2);
	      reject();
	    }
	    if (!opts.token) {
	      spinner.stop();
	      _terminalLog2.default.error('Error creating Github repo: oauth token was not provided', 2);
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
	        spinner.stop();
	        _terminalLog2.default.error('Error creating Github repo: ' + error, 2);
	        reject();
	      }
	      spinner.stop();
	      _terminalLog2.default.success('Created Github repo (github.com/' + opts.username + '/' + name + ')', 2);
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

	var _terminalLog = __webpack_require__(12);

	var _terminalLog2 = _interopRequireDefault(_terminalLog);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function generateGitignoreString(pkg) {
	  return 'node_modules';
	}

	function createGitignoreFile() {
	  return new Promise(function (resolve, reject) {
	    _fs2.default.writeFile(process.cwd() + '/.gitignore', generateGitignoreString(), function (err) {
	      if (err) {
	        _terminalLog2.default.error('There was an error generating .gitignore file: ' + err);
	        reject();
	      } else {
	        _terminalLog2.default.created('.gitignore', 2);
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

	var _child_process = __webpack_require__(11);

	var _terminalLog = __webpack_require__(12);

	var _terminalLog2 = _interopRequireDefault(_terminalLog);

	var _indentString = __webpack_require__(13);

	var _indentString2 = _interopRequireDefault(_indentString);

	var _terminalSpinnerNode = __webpack_require__(14);

	var _terminalSpinnerNode2 = _interopRequireDefault(_terminalSpinnerNode);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function installDependencies() {
	  return new Promise(function (resolve, reject) {
	    var spinner = new _terminalSpinnerNode2.default({
	      text: 'Installing dependencies',
	      color: 'green'
	    });
	    spinner.begin();
	    (0, _child_process.exec)('npm install', function (error, stdout, stderr) {
	      spinner.stop();
	      if (error) {
	        _terminalLog2.default.error('There was an error installing dependencies: ' + error, 2);
	        reject();
	      } else {
	        _terminalLog2.default.success('Successfully installed dependencies', 2);
	        resolve();
	      }
	    });
	  });
	}

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _fs = __webpack_require__(1);

	var _fs2 = _interopRequireDefault(_fs);

	var _terminalLog = __webpack_require__(12);

	var _terminalLog2 = _interopRequireDefault(_terminalLog);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function generateBabelrcString() {
	  return '{\n  "presets": [\n    "react",\n    "es2015",\n    \'stage-0\',\n   ],\n\t"env": {\n    "AVA": {\n      "plugins": [\n        [\n          "babel-plugin-webpack-loaders",\n          {\n            "config": "${CONFIG}",\n            "verbose": true\n          }\n        ]\n      ]\n    }\n  }\n}';
	}

	function createBabelrcFile() {
	  return new Promise(function (resolve, reject) {
	    _fs2.default.writeFile(process.cwd() + '/.babelrc', generateBabelrcString(), function (err) {
	      if (err) {
	        _terminalLog2.default.error('There was an error generating .babelrc fileName} file: ' + err);
	        reject();
	      } else {
	        _terminalLog2.default.created('.babelrc', 2);
	        resolve();
	      }
	    });
	  });
	}

	module.exports = createBabelrcFile;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _fs = __webpack_require__(1);

	var _fs2 = _interopRequireDefault(_fs);

	var _terminalLog = __webpack_require__(12);

	var _terminalLog2 = _interopRequireDefault(_terminalLog);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function generateCssString() {
	  return '.root {\n  /* */\n}\n';
	}

	function createMainCssFile() {
	  return new Promise(function (resolve, reject) {
	    _fs2.default.writeFile(process.cwd() + '/index.css', generateCssString(), function (err) {
	      if (err) {
	        _terminalLog2.default.error('There was an error generating index.css file: ' + err);
	        reject();
	      } else {
	        _terminalLog2.default.created('index.css', 2);
	        resolve();
	      }
	    });
	  });
	}

	module.exports = createMainCssFile;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _fs = __webpack_require__(1);

	var _fs2 = _interopRequireDefault(_fs);

	var _terminalLog = __webpack_require__(12);

	var _terminalLog2 = _interopRequireDefault(_terminalLog);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function generateExampleHTMLFile() {
	  return '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0//EN" "http://www.w3.org/TR/REC-html40/strict.dtd">\n<html>\n<head>\n  <title>\n  </title>\n  <!-- <script src="http://localhost:8080/webpack&#45;dev&#45;server.js"></script> -->\n</head>\n<body>\n  <div class="header">\n    Header\n  </div>\n  <script src="http://localhost:8080/assets/bundle.js"></script>\n</body>\n</html>';
	}

	function createExampleHTMLFile() {
	  return new Promise(function (resolve, reject) {
	    console.log('wwww');
	    _fs2.default.writeFile(process.cwd() + '/examples/index.html', generateExampleHTMLFile(), function (err) {
	      if (err) {
	        _terminalLog2.default.error('There was an error generating examples/index.html file: ' + err);
	        reject();
	      } else {
	        _terminalLog2.default.created('examples/index.html', 2);
	        resolve();
	      }
	    });
	  });
	}

	module.exports = createExampleHTMLFile;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

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

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});

		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

		var _promptNode = __webpack_require__(1);

		var _promptNode2 = _interopRequireDefault(_promptNode);

		var _promiseQueue = __webpack_require__(5);

		var _promiseQueue2 = _interopRequireDefault(_promiseQueue);

		var _stripAnsi = __webpack_require__(6);

		var _stripAnsi2 = _interopRequireDefault(_stripAnsi);

		var _indentString = __webpack_require__(7);

		var _indentString2 = _interopRequireDefault(_indentString);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

		var MultiPrompt = function () {
		  function MultiPrompt() {
		    var prompts = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

		    var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

		    var _ref$indent = _ref.indent;
		    var indent = _ref$indent === undefined ? 2 : _ref$indent;

		    _classCallCheck(this, MultiPrompt);

		    this.prompts = prompts;
		    this.indent = indent;
		    this.onDone = function () {};
		  }

		  _createClass(MultiPrompt, [{
		    key: 'addPrompt',
		    value: function addPrompt(prompt) {
		      this.prompts.push(prompt);
		    }
		  }, {
		    key: 'on',
		    value: function on(type, fn) {
		      switch (type) {
		        case 'done':
		          this.onDone = fn;
		          break;
		        default:
		      }

		      return this;
		    }
		  }, {
		    key: 'begin',
		    value: function begin() {
		      var instance = this;
		      return new Promise(function (resolve, reject) {
		        var promises = instance.prompts.map(function (question) {
		          return function (results) {
		            return new Promise(function (resolve, reject) {
		              // Helpers =====
		              function isQuestionTrue(results, question) {
		                // TODO: add options for no (false, no, n)
		                return question.dependent.answers.some(function (trueAnswer) {
		                  return results[question.dependent.question].answer === trueAnswer;
		                });
		              }
		              function isDependentOnAnotherQuestion(question) {
		                return question.dependent !== undefined;
		              }

		              if (!isDependentOnAnotherQuestion(question) || isQuestionTrue(results, question)) {
		                // }
		                // prompt(question.prompt)
		                var opts = {};
		                if (question.validation) {
		                  opts.validation = question.validation;
		                }
		                new _promptNode2.default((0, _indentString2.default)(question.prompt, instance.indent), { validation: question.validation }).on('validationError', function (answer) {
		                  if (question.validation && question.onValidationError) {
		                    question.onValidationError(answer);
		                  }
		                }).on('backspace', function () {
		                  if (question.onBackspace) {
		                    question.onBackspace();
		                  }
		                }).on('change', function (oldStr, newStr) {
		                  if (question.onChange) {
		                    question.onChange(oldStr, newStr);
		                  }
		                }).on('done', function (answer) {
		                  var identifier = question.identifier || (0, _stripAnsi2.default)(question.prompt);
		                  var result = void 0;
		                  if (question.onDone) {
		                    result = question.onDone(answer);
		                  }

		                  results[identifier] = {
		                    prompt: (0, _stripAnsi2.default)(question.prompt),
		                    answer: result || answer
		                  };

		                  resolve(results);
		                }).begin();
		              } else {
		                resolve(results);
		              }
		            });
		          };
		        });

		        var promiseQueue = new _promiseQueue2.default(promises);

		        promiseQueue.run().then(function (qa) {
		          instance.onDone(qa);
		          resolve(qa);
		        });
		      });
		    }
		  }]);

		  return MultiPrompt;
		}();

		exports.default = MultiPrompt;

	/***/ },
	/* 1 */
	/***/ function(module, exports, __webpack_require__) {

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

			Object.defineProperty(exports, "__esModule", {
			  value: true
			});

			var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

			var _chalk = __webpack_require__(1);

			var _chalk2 = _interopRequireDefault(_chalk);

			var _readline = __webpack_require__(2);

			var _readline2 = _interopRequireDefault(_readline);

			var _stringLength = __webpack_require__(3);

			var _stringLength2 = _interopRequireDefault(_stringLength);

			function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

			function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

			var Prompt = function () {
			  function Prompt() {
			    var text = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

			    var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

			    var _ref$hidden = _ref.hidden;
			    var hidden = _ref$hidden === undefined ? false : _ref$hidden;
			    var _ref$required = _ref.required;
			    var required = _ref$required === undefined ? false : _ref$required;
			    var _ref$validation = _ref.validation;
			    var validation = _ref$validation === undefined ? function () {
			      return true;
			    } : _ref$validation;

			    _classCallCheck(this, Prompt);

			    // Set instance properties
			    this.text = text;
			    this.hidden = hidden;
			    this.required = required;
			    this.validation = validation;
			    this.onDone = function () {};
			    this.onChange = function () {};
			    this.onKeypress = function () {};
			    this.onBackspace = function () {};
			    this.onValidationError = function () {};
			  }

			  _createClass(Prompt, [{
			    key: 'on',
			    value: function on(type, fn) {
			      switch (type) {
			        case 'backspace':
			          this.onBackspace = fn;
			          break;
			        case 'keypress':
			          this.onKeypress = fn;
			          break;
			        case 'change':
			          this.onChange = fn;
			          break;
			        case 'done':
			          this.onDone = fn;
			          break;
			        case 'validationError':
			          this.onValidationError = fn;
			          break;
			        default:
			      }

			      return this;
			    }
			  }, {
			    key: 'begin',
			    value: function begin() {
			      var instance = this;
			      _readline2.default.emitKeypressEvents(process.stdin);
			      process.stdin.setRawMode(true);

			      // Variables
			      var answer = '';
			      var answerCursorPos = 0;
			      var readlineInterface = _readline2.default.createInterface({
			        input: process.stdin
			      });

			      // Create event listener functions
			      function onKeypress(str, key) {
			        if (key && key.ctrl && key.name === 'c') {
			          process.emit('SIGINT');
			        } else if (key && key.name === 'left') {
			          answerCursorPos--;
			          process.stdout.cursorTo((0, _stringLength2.default)(instance.text) + 1 + answerCursorPos);
			        } else if (key && key.name === 'right') {
			          if (answerCursorPos !== (0, _stringLength2.default)(answer)) {
			            answerCursorPos++;
			            process.stdout.cursorTo((0, _stringLength2.default)(instance.text) + 1 + answerCursorPos);
			          }
			        } else if (key && key.name === 'up') {
			          // Do something
			        } else if (key && key.name === 'down') {
			          // Do something
			        } else if (key && key.name === 'return') {
			          // Do something
			        } else if (key && key.name === 'backspace') {
			          answerCursorPos--;
			          process.stdout.clearLine();
			          process.stdout.cursorTo(0);
			          answer = answer.slice(0, (0, _stringLength2.default)(answer) - 1);
			          if (instance.hidden) {
			            process.stdout.write(instance.text + ' ' + _chalk2.default.blue(convertStringToHidden(answer)));
			          } else {
			            process.stdout.write(instance.text + ' ' + _chalk2.default.blue(answer));
			          }
			          process.stdout.cursorTo((0, _stringLength2.default)(instance.text) + 1 + answerCursorPos);
			          instance.onBackspace();
			        } else {
			          var oldAnswer = answer;
			          answer = insert(answer, str, answerCursorPos);
			          answerCursorPos++;
			          process.stdout.clearLine();
			          process.stdout.cursorTo(0);
			          if (instance.hidden) {
			            process.stdout.write(instance.text + ' ' + _chalk2.default.blue(convertStringToHidden(answer)));
			          } else {
			            process.stdout.write(instance.text + ' ' + _chalk2.default.blue(answer));
			          }
			          process.stdout.cursorTo((0, _stringLength2.default)(instance.text) + 1 + answerCursorPos);

			          instance.onChange(oldAnswer, answer);
			        }
			        instance.onKeypress(str, key);
			      }

			      function onSigint() {
			        process.exit();
			      }

			      function onEnter() {
			        // Checks if validation fails OR if answer is empty string
			        if (!instance.validation(answer) || instance.required && stringIsEmpty(answer)) {
			          process.stdout.clearLine();
			          process.stdout.cursorTo(0);
			          if (instance.hidden) {
			            process.stdout.write(instance.text + ' ' + _chalk2.default.blue(convertStringToHidden(answer)));
			          } else {
			            process.stdout.write(instance.text + ' ' + _chalk2.default.blue(answer));
			          }
			          process.stdout.cursorTo((0, _stringLength2.default)(instance.text) + 1 + answerCursorPos);
			          instance.onValidationError(answer);
			        } else {
			          process.stdout.write('\n');
			          // clean listeners
			          process.removeListener('SIGINT', onSigint);
			          process.stdin.removeListener('keypress', onKeypress);
			          process.stdin.setRawMode(false);
			          readlineInterface.close();
			          instance.onDone(answer);
			        }
			      }

			      // Attach event listeners
			      process.stdin.on('keypress', onKeypress);
			      process.on('SIGINT', onSigint);
			      readlineInterface.on('line', onEnter);

			      // Create the prompt
			      process.stdout.write(instance.text + ' ');
			    }
			  }]);

			  return Prompt;
			}();

			function insert(str, what, index) {
			  // should we use string-length here, incase the user uses chalk in the answer?
			  if (str.length === 0) {
			    return what;
			  }
			  return index > 0 ? str.replace(new RegExp('.{' + index + '}'), '$&' + what) : what + str;
			}

			function stringIsEmpty(str) {
			  return str.split('').every(function (char) {
			    return char === ' ';
			  });
			}

			function convertStringToHidden(str) {
			  var hiddenChar = arguments.length <= 1 || arguments[1] === undefined ? '*' : arguments[1];

			  return hiddenChar.repeat(str.split('').length);
			}

			exports.default = Prompt;

		/***/ },
		/* 1 */
		/***/ function(module, exports) {

			module.exports = __webpack_require__(2);

		/***/ },
		/* 2 */
		/***/ function(module, exports) {

			module.exports = __webpack_require__(3);

		/***/ },
		/* 3 */
		/***/ function(module, exports) {

			module.exports = __webpack_require__(4);

		/***/ }
		/******/ ]);

	/***/ },
	/* 2 */
	/***/ function(module, exports) {

		module.exports = __webpack_require__(4);

	/***/ },
	/* 3 */
	/***/ function(module, exports) {

		module.exports = __webpack_require__(33);

	/***/ },
	/* 4 */
	/***/ function(module, exports) {

		module.exports = __webpack_require__(34);

	/***/ },
	/* 5 */
	/***/ function(module, exports) {

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
		/***/ function(module, exports) {

			"use strict";

			Object.defineProperty(exports, "__esModule", {
			  value: true
			});

			var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

			function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

			var PromiseQueue = function () {
			  function PromiseQueue(promiseArray) {
			    _classCallCheck(this, PromiseQueue);

			    this.promiseArray = promiseArray;
			  }

			  _createClass(PromiseQueue, [{
			    key: "run",
			    value: function run(startObj) {
			      var _this = this;

			      return new Promise(function (resolve, reject) {
			        var that = _this;
			        var currentIndex = 0;

			        function next(passedVal) {
			          currentIndex++;
			          if (currentIndex >= that.promiseArray.length) {
			            resolve(passedVal);
			          } else {
			            that.promiseArray[currentIndex](passedVal).then(function (passedVal) {
			              next(passedVal);
			            });
			          }
			        }
			        that.promiseArray[currentIndex](startObj || {}).then(function (passedVal) {
			          next(passedVal);
			        });
			      });
			    }
			  }]);

			  return PromiseQueue;
			}();

			exports.default = PromiseQueue;

		/***/ }
		/******/ ]);

	/***/ },
	/* 6 */
	/***/ function(module, exports) {

		module.exports = __webpack_require__(35);

	/***/ },
	/* 7 */
	/***/ function(module, exports) {

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

			Object.defineProperty(exports, "__esModule", {
			  value: true
			});

			var _assert = __webpack_require__(1);

			var _assert2 = _interopRequireDefault(_assert);

			var _isEmptyLine = __webpack_require__(2);

			var _isEmptyLine2 = _interopRequireDefault(_isEmptyLine);

			function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

			exports.default = function (str) {
			  var count = arguments.length <= 1 || arguments[1] === undefined ? 2 : arguments[1];
			  var character = arguments.length <= 2 || arguments[2] === undefined ? ' ' : arguments[2];

			  _assert2.default.type(str, 'string');
			  _assert2.default.type(character, 'string');

			  return str.split('\n').map(function (line) {
			    if ((0, _isEmptyLine2.default)(line)) return line;
			    return '' + character.repeat(count) + line;
			  }).join('\n');
			};

		/***/ },
		/* 1 */
		/***/ function(module, exports) {

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
			/***/ function(module, exports) {

				"use strict";

				Object.defineProperty(exports, "__esModule", {
				  value: true
				});

				var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

				exports.default = {
				  type: function type(val, _type) {
				    if ((typeof val === "undefined" ? "undefined" : _typeof(val)) !== _type) {
				      throw new TypeError("Expected '" + val + "' to be a '" + _type + "', got '" + (typeof val === "undefined" ? "undefined" : _typeof(val)) + "'");
				    }
				  }
				};

			/***/ }
			/******/ ]);

		/***/ },
		/* 2 */
		/***/ function(module, exports) {

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
			/***/ function(module, exports) {

				'use strict';

				Object.defineProperty(exports, "__esModule", {
				  value: true
				});

				var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

				var assert = {
				  type: function type(val, _type) {
				    if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) !== _type) {
				      throw new TypeError('Expected \'' + val + '\' to be a \'' + _type + '\', got \'' + (typeof val === 'undefined' ? 'undefined' : _typeof(val)) + '\'');
				    }
				  }
				};

				exports.default = function (str) {
				  assert.type(str, 'string');

				  var emptyCharacters = ['\n', ' '];

				  return str.split('').every(function (ch) {
				    return emptyCharacters.indexOf(ch) !== -1;
				  });
				};

			/***/ }
			/******/ ]);

		/***/ }
		/******/ ]);

	/***/ }
	/******/ ]);

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = require("readline");

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = require("string-length");

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = require("strip-ansi");

/***/ },
/* 36 */
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
/* 37 */
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

	var _parseArgv = __webpack_require__(7);

	var _parseArgv2 = _interopRequireDefault(_parseArgv);

	var _terminalLog = __webpack_require__(12);

	var _terminalLog2 = _interopRequireDefault(_terminalLog);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function configureNpmBetterInit(commandLineArgs) {
	  return new Promise(function (resolve, reject) {
	    var configArgs = commandLineArgs.slice(1);
	    var configArgv = (0, _parseArgv2.default)(configArgs, {
	      usage: '$ npm-better-init config [options]',
	      options: [{
	        flag: 'github-token',
	        alias: 't',
	        description: 'Adds github token (must be used with config: $ config --github-token)'
	      }, {
	        flag: 'github-username',
	        alias: 'u',
	        description: 'Adds github username (must be used with config: $ config --github-username)'
	      }],
	      examples: [{
	        usage: '$ npm-better-init config --github-token=woowee',
	        output: ''
	      }]
	    });
	    var githubUsername = configArgv['github-username'];
	    var githubToken = configArgv['github-token'];
	    // For dotevn, duplicated in the main file (npmBetterInit.js)
	    // TODO: refactor this and the instance in npmBetterInit
	    var envFilePath = '';
	    if (_path2.default.resolve(__dirname).split('/').pop() === 'dist') {
	      envFilePath = _path2.default.resolve(__dirname, '..', '.env');
	    } else {
	      envFilePath = _path2.default.resolve(__dirname, '.env');
	    }

	    if (githubUsername) {
	      try {
	        _fs2.default.appendFile(envFilePath, 'GITHUB_USERNAME=' + githubUsername + '\n', function () {
	          _terminalLog2.default.success('Your Github token has been saved.');
	          resolve();
	        });
	      } catch (error) {
	        _terminalLog2.default.error('There was an error saving your Github username: ' + error);
	        reject();
	      } finally {}
	    }
	    if (githubToken) {
	      try {
	        _fs2.default.appendFile(envFilePath, 'GITHUB_TOKEN=' + githubToken + '\n', function () {
	          _terminalLog2.default.success('Your Github token has been saved.');
	          resolve();
	        });
	      } catch (error) {
	        _terminalLog2.default.error('There was an error saving your Github token: ' + error);
	        reject();
	      } finally {}
	    }
	  });
	}

/***/ }
/******/ ]);