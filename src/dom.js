function renderBoard(board, elementId) {
  const boardElement = document.getElementById(elementId);
  boardElement.innerHTML = '';

  for (let i = 0; i < 10; i += 1) {
    const row = document.createElement('div');
    row.classList.add('row');
    for (let j = 0; j < 10; j += 1) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.setAttribute('info', board.board[j][i]);

      if (board.board[j][i] === 'hit') {
        cell.classList.add('hit');
      }
      if (board.board[j][i] === 'miss') {
        cell.innerHTML = 'X';
        cell.classList.add('miss');
      }

      if (elementId === 'computer-board') {
        cell.addEventListener('click', () => {
          board.receiveAttack(i, j);
          updateBoard(board, elementId);
        });
      }

      row.appendChild(cell);
    }
    boardElement.appendChild(row);
  }
}

function updateBoard(board, elementId) {
  renderBoard(board, elementId);
}

export { renderBoard, updateBoard };
