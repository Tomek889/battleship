import Gameboard from '../../src/classes/Gameboard';
import Ship from '../../src/classes/Ship';

test('Place ships at specific coordinates', () => {
  const ship = new Ship(3);
  const board = new Gameboard();

  board.placeShip(ship, 2, 3, true);

  expect(board.board[3][2]).toBe(ship);
  expect(board.board[3][3]).toBe(ship);
  expect(board.board[3][4]).toBe(ship);
  expect(board.board[3][5]).toBe(0);
});

test('Determine whether or not the attack hit a ship', () => {
  const ship = new Ship(3);
  const board = new Gameboard();

  board.placeShip(ship, 2, 3, true);

  board.receiveAttack(2, 3);
  board.receiveAttack(4, 4);

  expect(board.board[3][3]).toBe(ship);
  expect(board.board[3][2]).toBe('hit');
  expect(board.board[4][4]).toBe('miss');
});

test('Report whether or not all of the ships have been sunk', () => {
  const ship = new Ship(3);
  const board = new Gameboard();

  board.placeShip(ship, 2, 3, true);

  expect(board.allShipsSunk()).toBe(false);

  board.receiveAttack(2, 3);
  board.receiveAttack(3, 3);
  board.receiveAttack(4, 3);

  expect(board.allShipsSunk()).toBe(true);
});
