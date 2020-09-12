import 'jest-canvas-mock';
import 'babel-jest';
import Menu from '../src/js/Menu';

const menuScene = new Menu();

describe('Check Menu Scene', () => {
  test('Check if menuScene is an instance of a Menu class', () => {
    expect(menuScene).toBeInstanceOf(Menu);
  });

  test('check if menuScene is an Object', () => {
    expect(typeof menuScene).toEqual('object');
  });
});