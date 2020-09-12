
import '@babel/polyfill';
import 'jest-canvas-mock';
import 'babel-jest';
import { getData, pushData } from '../src/js/calls';


describe('Check GET API', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  fetch.mockResponse(JSON.stringify({ result: [{ user: 'SpaYco', score: 15 }, { user: 'SpaYso', score: 45 }] }));
  test('check if the API returns an Object', () => {
    expect(typeof getData()).toEqual('object');
  });
  test('check if the API have scores', () => {
    getData().then(res => {
      expect(typeof res[0].score).toEqual('number');
    });
  });
  test('check if the function sorts the scores', () => {
    getData().then(res => {
      expect(typeof res[0].score > res[1].score).toEqual('number');
    });
  });
});

describe('Check POST API', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  fetch.mockResponse(JSON.stringify({ result: 'Leaderboard score created correctly.' }));
  test('check if the API returns an object', () => {
    pushData().then(res => {
      expect(typeof res.json()).toEqual('object');
    });
  });
  test('check if the API adds a score', () => {
    pushData().then(res => {
      expect(res.json().result).toEqual('Leaderboard score created correctly.');
    });
  });
});