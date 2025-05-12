import Player from './classes/Player';
import Ship from './classes/Ship';
import renderBoard from './dom';

let user;
let computer;

export default function startGame() {
  user = new Player(true);
  computer = new Player(false);

  renderBoard(user.board, 'player-board');
  renderBoard(computer.board, 'computer-board');
}

function shootUser() {
  let randomX = Math.floor(Math.random() * 10);
  let randomY = Math.floor(Math.random() * 10);

  let isLeftCell = false;
  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      if (user.board.board[j][i] === 0) {
        isLeftCell = true;
      }
    }
  }

  if (!isLeftCell) {
    return;
  }

  while (user.board.board[randomY][randomX] !== 0) {
    randomX = Math.floor(Math.random() * 10);
    randomY = Math.floor(Math.random() * 10);
  }

  user.board.receiveAttack(randomX, randomY);
  renderBoard(user.board, 'player-board');
}

export { shootUser };
