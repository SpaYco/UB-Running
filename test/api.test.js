
// eslint-disable-next-line no-unused-vars
import { enableFetchMocks } from 'jest-fetch-mock';
import { getData, pushData } from '../src/js/calls';


describe('Check GET API', () => {
  test('check if the API returns an Array', async () => {
    const data = await getData();
    expect(typeof await data).toEqual('object');
  });
  test('check if the API have scores', async () => {
    const data = await getData();
    expect(typeof data[0].score).toEqual('number');
  });
  test('check if the function sorts the scores', async () => {
    const data = await getData();
    expect(data[0].score > data[1].score).toEqual(true);
  });
});

describe('Check POST API', () => {
  test('check if the API adds a score', () => {
    const data = { user: 'test_name', score: 1 };
    const jData = JSON.stringify(data);
    const result = pushData(jData);
    expect(typeof result).toEqual('object');
  });
});