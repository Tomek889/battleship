import Gameboard from './Gameboard';

export default class Player {
  constructor(isReal) {
    this.isReal = isReal;
    this.board = new Gameboard();
  }
}
