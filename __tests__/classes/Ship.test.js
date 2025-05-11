import Ship from '../../src/classes/Ship';

test('Ship tracks hits and sinks correctly', () => {
  const ship = new Ship(3);

  expect(ship.isSunk()).toBe(false);

  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(false);

  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
