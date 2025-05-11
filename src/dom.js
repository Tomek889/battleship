function renderBoard(board, elementId) {
  const boardElement = document.getElementById(elementId);
  boardElement.innerHTML = '';

  for (let i = 0; i < 10; i += 1) {
    const row = document.createElement('div');
    row.classList.add('row');
    for (let j = 0; j < 10; j += 1) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      row.appendChild(cell);
    }
    boardElement.appendChild(row);
  }
}

function updateBoard(board, elementId) {
  renderBoard(board, elementId);
}

export { renderBoard, updateBoard };
