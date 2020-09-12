
import 'babel-polyfill';
import 'jest-canvas-mock';
import 'babel-jest';
import Game from '../src/js/Game';

const gameScene = new Game();

describe('Check Game Scene', () => {
  test('Check if gameScene is an instance of a Game class', () => {
    expect(gameScene).toBeInstanceOf(Game);
  });

  test('check if gameScene is an Object', () => {
    expect(typeof gameScene).toEqual('object');
  });
});