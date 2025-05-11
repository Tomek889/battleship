export default class Gameboard {
  constructor() {
    this.board = Array.from({ length: 10 }, () => Array(10).fill(0));
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
}
