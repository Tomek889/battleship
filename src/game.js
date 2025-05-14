import Player from './classes/Player';
import Ship from './classes/Ship';
import renderBoard, { gameOver } from './dom';

const placeBtn = document.querySelector('#placeBtn');
const startBtn = document.querySelector('#startBtn');
const restartBtn = document.querySelector('#restartBtn');
const infoText = document.querySelector('#info');

let user;
let computer;
let isGameOn = false;

export default function startGame() {
  clearInfo();

  user = new Player(true);
  computer = new Player(false);

  randomPlace(user.board, 'player-board');
  randomPlace(computer.board, 'computer-board');

  renderBoard(user.board, 'player-board');
  renderBoard(computer.board, 'computer-board');
}

function shootUser() {
  let randomX = Math.floor(Math.random() * 10);
  let randomY = Math.floor(Math.random() * 10);

  let isLeftCell = false;
  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      if (
        user.board.board[j][i] !== 'miss' &&
        user.board.board[j][i] !== 'hit'
      ) {
        isLeftCell = true;
      }
    }
  }

  if (!isLeftCell) {
    return;
  }

  while (
    user.board.board[randomY][randomX] === 'hit' ||
    user.board.board[randomY][randomX] === 'miss'
  ) {
    randomX = Math.floor(Math.random() * 10);
    randomY = Math.floor(Math.random() * 10);
  }

  user.board.receiveAttack(randomX, randomY);
  renderBoard(user.board, 'player-board');

  if (user.board.allShipsSunk()) {
    gameOver('Computer');
  }
}

function randomPlace(board, elementId) {
  board.resetBoard();

  const shipsLength = [5, 4, 3, 3, 2];

  shipsLength.forEach((len) => {
    const ship = new Ship(len);

    let randomX = Math.floor(Math.random() * 10);
    let randomY = Math.floor(Math.random() * 10);

    while (!board.placeShip(ship, randomX, randomY, Math.random() > 0.5)) {
      randomX = Math.floor(Math.random() * 10);
      randomY = Math.floor(Math.random() * 10);
    }
  });

  renderBoard(board, elementId);
}

function setGameOff() {
  isGameOn = false;
}

function getGameOn() {
  return isGameOn;
}

function clearInfo() {
  infoText.innerHTML = '';
}

function addInfo(text) {
  infoText.innerHTML = text;
}

function getInfoContent() {
  return infoText.innerHTML;
}

placeBtn.addEventListener('click', () => {
  randomPlace(user.board, 'player-board');
});

startBtn.addEventListener('click', () => {
  clearInfo();
  isGameOn = true;
  restartBtn.classList.toggle('hidden');
  placeBtn.classList.toggle('hidden');
  startBtn.classList.toggle('hidden');
});

restartBtn.addEventListener('click', () => {
  isGameOn = false;
  startGame();
  restartBtn.classList.toggle('hidden');
  placeBtn.classList.toggle('hidden');
  startBtn.classList.toggle('hidden');
});

export { shootUser, getGameOn, setGameOff, clearInfo, addInfo, getInfoContent };
