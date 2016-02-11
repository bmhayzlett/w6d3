var HanoiView = require("./hanoiView");
var HanoiGame = require("../../hanoi-core-solution/game.js");

$(function () {
  var rootEl = $('.hanoi');
  var game = new HanoiGame();
  new HanoiView(game,rootEl);
});
