
import 'babel-polyfill';
import 'jest-canvas-mock';
import 'babel-jest';
// eslint-disable-next-line import/extensions
import Scores from '../src/js/Scores';

const scoresScene = new Scores();

describe('Check Scores Scene', () => {
  test('Check if scoresScene is an instance of a Scores class', () => {
    expect(scoresScene).toBeInstanceOf(Scores);
  });

  test('check if scoresScene is an Object', () => {
    expect(typeof scoresScene).toEqual('object');
  });
});