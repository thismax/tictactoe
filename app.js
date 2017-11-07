var prompt = require('prompt');

var Game = function () {
  this.board = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ];
  this.player = 'X';
  this.moves = 0;
};

Game.prototype.move = function () {
  this.board[row][col] = this.player;
  this.moves++;
};

Game.prototype.nextPlayer = function () {
  this.player = this.player === 'X' ? 'O' : 'X';
};

Game.prototype.printBoard = function (board) {
  console.log('====================================');
  console.log(board[0][0], '|', board[0][1], '|', board[0][2]);
  console.log(board[1][0], '|', board[1][1], '|', board[1][2]);
  console.log(board[2][0], '|', board[2][1], '|', board[2][2]);
  console.log('====================================');
};

Game.prototype.makeMove = function(move) {
  var row = Math.floor((move - 1) / 3);
  var col = (move - 1) % 3;
  return {row, col};
};

Game.prototype.isPositionOccupied = function(move) {
  var {row, col} = this.makeMove(move);
  return typeof this.board[row][col] === 'string';
};

Game.prototype.isInvalidMove = function (move) {
  move = Number(move);
  if (move > 9 || move < 1) {
    console.log('number must be between 1 and 9');
    return true;
  } else if (Math.floor(move) !== move) {
    console.log('number must be an integer');
    return true;
  } else if (this.isPositionOccupied(move)) {
    console.log('that position is already occupied');
    return true;
  } else {
    return false;
  }
};

Game.prototype.areAllEqual = function(a, b, c) {
  return a === b && b === c;
};

Game.prototype.isRowWinner = function(row) {
  return this.areAllEqual(this.board[row][0], this.board[row][1], this.board[row][2]);
};

Game.prototype.isColWinner = function(col) {
  return this.areAllEqual(this.board[0][col], this.board[1][col], this.board[2][col]);
};

Game.prototype.isDiagonalWinner = function() {
  return this.areAllEqual(this.board[0][0], this.board[1][1], this.board[2][2]) || this.areAllEqual(this.board[0][2], this.board[1][1], this.board[2][0]);
};

Game.prototype.isWinner = function(row, col) {
  return this.isRowWinner(row) || this.isColWinner(col) || this.isDiagonalWinner();
};

Game.prototype.isDraw = function () {
  return this.moves === 9;
};

Game.prototype.printWinner = function() {
  console.log(`Congratulations, ${this.player}, you've won!`);
};

Game.prototype.getMove = function() {
  var move; 
  while (this.isInvalidMove(move)) {
    move = prompt.question(`Player ${this.player}, it's your turn! Please choose a move (1-9): `);
  } 
  return this.makeMove(move);
};

Game.prototype.play = function() {
  this.printBoard();
  var {row, col} = this.getMove();
  this.move(row, col);
  if (this.isWinner(row, col)) {
    this.printWinner();
  } else if (this.isDraw()) {
    console.log( 'It\'s a draw' );
  } else {
    this.nextPlayer();
    this.play();
  }
};


