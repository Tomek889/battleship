export default class Gameboard {
  constructor() {
    this.board = Array.from({ length: 10 }, () => Array(10).fill(0));
    this.missed = [];
  }

  placeShip(ship, x, y, isHorizontal) {
    for (let i = 0; i < ship.length; i += 1) {
      if (isHorizontal) {
        this.board[y][x + i] = ship;
      } else {
        this.board[y + i][x] = ship;
      }
    }
  }

  receiveAttack(x, y) {
    const target = this.board[y][x];
    if (target === 0) {
      this.board[y][x] = 'miss';
      this.missed.push([x, y]);
    } else if (typeof target === 'object') {
      target.hit();
      this.board[y][x] = 'hit';
    }
  }

  allShipsSunk() {
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        if (typeof this.board[j][i] === 'object') {
          return false;
        }
      }
    }
    return true;
  }

  resetBoard() {
    this.board = Array.from({ length: 10 }, () => Array(10).fill(0));
    this.missed = [];
  }
}
