/* eslint-disable no-prototype-builtins */
import MelhorEnvio from './index';

describe('MelhorEnvio.constructor()', () => {
  test('check if class has all prototypes', async () => {
    expect(MelhorEnvio.prototype.hasOwnProperty('fetch')).toBe(true);
  });

  test('calls constructor with default params and check const', async () => {
    const me = new MelhorEnvio('token123');
    expect(me.token).toBe('token123');
    expect(me.isSandbox).toBe(false);
  });

  test('calls constructor with custom params and check const', async () => {
    const me = new MelhorEnvio('token123', true);
    expect(me.token).toBe('token123');
    expect(me.isSandbox).toBe(true);
  });
});
