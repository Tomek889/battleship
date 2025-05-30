import {
  shootUser,
  getGameOn,
  setGameOff,
  clearInfo,
  addInfo,
  getInfoContent,
} from './game';

export default function renderBoard(board, elementId) {
  const boardElement = document.getElementById(elementId);
  boardElement.innerHTML = '';

  for (let i = 0; i < 10; i += 1) {
    const row = document.createElement('div');
    row.classList.add('row');
    for (let j = 0; j < 10; j += 1) {
      const cell = document.createElement('div');
      cell.classList.add('cell');

      if (board.board[j][i] === 'hit') {
        cell.classList.add('hit');
      }
      if (board.board[j][i] === 'miss') {
        cell.innerHTML = 'X';
        cell.classList.add('miss');
      }
      if (
        board.board[j][i] !== 0 &&
        typeof board.board[j][i] === 'object' &&
        elementId === 'player-board'
      ) {
        cell.classList.add('ship');
      }

      if (elementId === 'computer-board') {
        cell.addEventListener('click', () => {
          if (getGameOn()) {
            clearInfo();
            if (board.board[j][i] !== 'hit' && board.board[j][i] !== 'miss') {
              board.receiveAttack(i, j);
              renderBoard(board, elementId);

              if (board.allShipsSunk()) {
                gameOver('User');
                return;
              }

              shootUser();

              if (board.allShipsSunk()) {
                gameOver('Computer');
              }
            } else {
              addInfo('You have clicked that cell already.');
            }
          } else if (getInfoContent() === '') {
            addInfo('You have to start the game first.');
          }
        });
      }

      row.appendChild(cell);
    }
    boardElement.appendChild(row);
  }
}

function gameOver(winner) {
  setGameOff();
  addInfo(`${winner} has won the game!`);
}

export { gameOver };
