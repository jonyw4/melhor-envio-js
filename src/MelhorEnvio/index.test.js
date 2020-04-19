/* eslint-disable no-prototype-builtins */
import MelhorEnvio from './index';
import generateTestToken from '../utils/generateTestToken';

const myDate = new Date();
myDate.setDate(myDate.getDate() + 1);

const token = generateTestToken(myDate.toString());

describe('MelhorEnvio.constructor()', () => {
  test('check if class has all prototypes', async () => {
    expect(MelhorEnvio.prototype.hasOwnProperty('fetch')).toBe(true);
  });

  test('calls constructor with default params and check const', async () => {
    const me = new MelhorEnvio(token);
    expect(me.token).toBe(token);
    expect(me.isSandbox).toBe(false);
  });

  test('calls constructor with custom params and check const', async () => {
    const me = new MelhorEnvio(token, true);
    expect(me.token).toBe(token);
    expect(me.isSandbox).toBe(true);
  });
});
