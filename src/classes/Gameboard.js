export default class Gameboard {
  constructor() {
    this.board = Array.from({ length: 10 }, () => Array(10).fill(0));
    this.missed = [];
  }

  placeShip(ship, x, y, isHorizontal) {
    if (isHorizontal) {
      if (x + ship.length > 10) return false;

      // Check if the cells for the ship and the surrounding cells are empty
      for (let i = 0; i < ship.length; i += 1) {
        if (this.board[y][x + i] !== 0) return false;
        if (x + i > 0 && this.board[y][x + i - 1] !== 0) return false;
        if (x + i < 9 && this.board[y][x + i + 1] !== 0) return false;

        if (y > 0 && this.board[y - 1][x + i] !== 0) return false;
        if (y < 9 && this.board[y + 1][x + i] !== 0) return false;
      }

      for (let i = 0; i < ship.length; i += 1) {
        this.board[y][x + i] = ship;
      }
    } else {
      if (y + ship.length > 10) return false;

      // Check if the cells for the ship and the surrounding cells are empty
      for (let i = 0; i < ship.length; i += 1) {
        if (this.board[y + i][x] !== 0) return false;
        if (y + i > 0 && this.board[y + i - 1][x] !== 0) return false;
        if (y + i < 9 && this.board[y + i + 1][x] !== 0) return false;

        if (x > 0 && this.board[y + i][x - 1] !== 0) return false;
        if (x < 9 && this.board[y + i][x + 1] !== 0) return false;
      }

      for (let i = 0; i < ship.length; i += 1) {
        this.board[y + i][x] = ship;
      }
    }

    return true;
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
