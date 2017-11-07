var prompt = require('prompt');

var Game = function() {
  this.board = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
  this.player = 'O';
  this.moves = 0;
};

Game.prototype.move = function () {

};

Game.prototype.printBoard = function(board) {
  console.log('====================================')
  console.log(board[0][0], '|', board[0][1],'|', board[0][2]);
  console.log(board[1][0], '|', board[1][1],'|', board[1][2]);
  console.log(board[2][0], '|', board[2][1],'|', board[2][2]);
  console.log('====================================')
};

Game.prototype.isDraw = function() {
  return this.moves === 9;
};