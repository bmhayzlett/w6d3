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
