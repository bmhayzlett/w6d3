/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var HanoiView = __webpack_require__(1);
	var HanoiGame = __webpack_require__(3);
	
	$(function () {
	  var rootEl = $('.hanoi');
	  var game = new HanoiGame();
	  new HanoiView(game,rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	/* globals View */
	function HanoiView(game, $el) {
	  this.game = game;
	  this.$el = $el;
	  this.firstTower = undefined;
	
	  this.setupTowers();
	  this.bindEvents();
	}
	
	HanoiView.prototype.setupTowers = function () {
	  for ( var i = 0; i < 3; i++) {
	    this.addTower();
	  }
	  this.render();
	};
	
	HanoiView.prototype.render = function () {
	  $(".tower").empty();
	  var towers = this.game.towers;
	  for (var i = 0; i < 3; i++) {
	    var $tower = $(".tower").eq(i);
	    // debugger;
	    var tower = towers[i];
	    for (var j = tower.length; j > 0; j--) {
	      var $disk = $("<li>").addClass("disk-" + tower[j-1]);
	      $tower.append($disk);
	    }
	  }
	};
	
	HanoiView.prototype.addTower = function () {
	  var towNum = this.$el.find(".tower").length;
	  var $tower = $("<ul>").addClass("tower").addClass("group")
	    .data("towNum", towNum);
	  this.$el.append($tower);
	};
	
	HanoiView.prototype.bindEvents = function () {
	  this.$el.on("click", ".tower", function(e){
	    var towNum = $(e.currentTarget).data("towNum");
	    // debugger;
	    this.clickTower(towNum);
	  }.bind(this));
	};
	
	HanoiView.prototype.clickTower = function (towNum) {
	  if (this.firstTower === undefined) {
	    this.firstTower = towNum;
	    // debugger;
	  } else {
	    try { this.game.move(this.firstTower, towNum); }
	    catch(e) { alert(e.msg);}
	    this.render();
	    this.firstTower = undefined;
	  }
	};
	
	module.exports = HanoiView;


/***/ },
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	function Game () {
	  this.towers = [[3, 2, 1], [], []];
	};
	
	Game.prototype.isValidMove = function (startTowerIdx, endTowerIdx) {
	  var startTower = this.towers[startTowerIdx];
	  var endTower = this.towers[endTowerIdx];
	
	  if (startTower.length === 0) {
	    return false;
	  } else if (endTower.length == 0) {
	    return true;
	  } else {
	    var topStartDisc = startTower[startTower.length - 1];
	    var topEndDisc = endTower[endTower.length - 1];
	    return topStartDisc < topEndDisc;
	  }
	};
	
	Game.prototype.isWon = function () {
	  // move all the discs to the last or second tower
	  return (this.towers[2].length == 3) || (this.towers[1].length == 3);
	};
	
	Game.prototype.move = function (startTowerIdx, endTowerIdx) {
	  if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	    this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	    return true;
	  } else {
	    return false;
	  }
	};
	
	Game.prototype.print = function () {
	  console.log(JSON.stringify(this.towers));
	};
	
	Game.prototype.promptMove = function (reader, callback) {
	  this.print();
	  reader.question("Enter a starting tower: ", function (start) {
	    var startTowerIdx = parseInt(start);
	    reader.question("Enter an ending tower: ", function (end) {
	      var endTowerIdx = parseInt(end);
	      callback(startTowerIdx, endTowerIdx)
	    });
	  });
	};
	
	Game.prototype.run = function (reader, gameCompletionCallback) {
	  this.promptMove(reader, (function (startTowerIdx, endTowerIdx) {
	    if (!this.move(startTowerIdx, endTowerIdx)) {
	      console.log("Invalid move!");
	    }
	
	    if (!this.isWon()) {
	      // Continue to play!
	      this.run(reader, gameCompletionCallback);
	    } else {
	      this.print();
	      console.log("You win!");
	      gameCompletionCallback();
	    }
	  }).bind(this));
	};
	
	module.exports = Game;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map