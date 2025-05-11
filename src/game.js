import Player from './classes/Player';
import Ship from './classes/Ship';
import { renderBoard, updateBoard } from './dom';

export default function startGame() {
  const user = new Player(true);
  const computer = new Player(false);

  renderBoard(user.board, 'player-board');
  renderBoard(computer.board, 'computer-board');
}
