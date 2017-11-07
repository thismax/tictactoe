var prompt = require('readline-sync');

class Game {
  constructor() {
    this.board = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];
    this.player = 'X';
    this.moves = 0;
  }

  move(row, col) {
    this.board[row][col] = this.player;
    this.moves++;
  }

  nextPlayer() {
    this.player = this.player === 'X' ? 'O' : 'X';
  }

  printBoard() {
    console.log('====================================');
    console.log(this.board[0][0], '|', this.board[0][1], '|', this.board[0][2]);
    console.log(this.board[1][0], '|', this.board[1][1], '|', this.board[1][2]);
    console.log(this.board[2][0], '|', this.board[2][1], '|', this.board[2][2]);
    console.log('====================================');
  }

  makeMove(move) {
    var row = Math.floor((move - 1) / 3);
    var col = (move - 1) % 3;
    return {row, col};
  }

  isPositionOccupied(move) {
    var {row, col} = this.makeMove(move);
    return typeof this.board[row][col] === 'string';
  }

  isInvalidMove(move) {
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
  }

  areAllEqual(a, b, c) {
    return a === b && b === c;
  }

  isRowWinner(row) {
    return this.areAllEqual(this.board[row][0], this.board[row][1], this.board[row][2]);
  }

  isColWinner(col) {
    return this.areAllEqual(this.board[0][col], this.board[1][col], this.board[2][col]);
  }
  
  isDiagonalWinner() {
    return this.areAllEqual(this.board[0][0], this.board[1][1], this.board[2][2]) || this.areAllEqual(this.board[0][2], this.board[1][1], this.board[2][0]);
  }
  
  isWinner(row, col) {
    return this.isRowWinner(row) || this.isColWinner(col) || this.isDiagonalWinner();
  }
  
  isDraw () {
    return this.moves === 9;
  }
  
  printWinner() {
    console.log(`Congratulations, ${this.player}, you've won!`);
  }
  
  getMove() {
    var move;
    var move = prompt.question(`Player ${this.player}, it's your turn! Please choose a move (1-9): `);
    if (this.isInvalidMove(move)) {
      this.getMove();
    } else {
      return this.makeMove(move);
    }
  }
  
  play() {
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
  }

}


var game = new Game();
game.play();