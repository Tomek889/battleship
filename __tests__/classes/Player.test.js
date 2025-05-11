import Player from '../../src/classes/Player';

test('initializes properly and has its own board', () => {
  const user = new Player(true);
  const computer = new Player(false);

  expect(typeof user.board).toBe('object');
  expect(typeof computer.board).toBe('object');
});
