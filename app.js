var prompt = require('prompt');

var Game = function() {
  this.board = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
  this.player = 'O';
  this.moves = 0;
}

Game.prototype.move = function () {
  
}