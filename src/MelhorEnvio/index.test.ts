/* eslint-disable no-prototype-builtins */
import MelhorEnvio from './index';
import generateTestToken from '../utils/generateTestToken';

const myDate = new Date();
myDate.setDate(myDate.getDate() + 1);

const token = generateTestToken(myDate.toString());
const oldToken = generateTestToken('2020-03-01');

describe('MelhorEnvio.constructor()', () => {
  it('should class has all prototypes', async () => {
    expect(MelhorEnvio.prototype.hasOwnProperty('fetch')).toBe(true);
    expect(MelhorEnvio.prototype.hasOwnProperty('getShipmentServices')).toBe(
      true
    );
    expect(MelhorEnvio.prototype.hasOwnProperty('calculateShipment')).toBe(
      true
    );
  });

  it('should constructor have default params and check const', async () => {
    const me = new MelhorEnvio(token);
    expect(me.token).toBe(token);
    expect(me.isSandbox).toBe(false);
  });

  it('should constructor have custom params and check const', async () => {
    const me = new MelhorEnvio(token, true);
    expect(me.token).toBe(token);
    expect(me.isSandbox).toBe(true);
  });

  it('should create a instance with old token and throw an error', async () => {
    const fn = () => new MelhorEnvio(oldToken, true);
    expect(fn).toThrow(Error);
  });
});
