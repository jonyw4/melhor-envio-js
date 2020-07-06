import checkTokenValid from './checkTokenValid';
import generateTestToken from './generateTestToken';

describe('checkTokenValid()', () => {
  it('should return false for old token', async () => {
    const token = generateTestToken('2020-03-01');
    const isTokenValid = checkTokenValid(token);
    expect(isTokenValid).toBe(false);
  });
  it('should return true for new token', async () => {
    const myDate = new Date();
    myDate.setDate(myDate.getDate() + 1);
    const token = generateTestToken(myDate.toString());
    const isTokenValid = checkTokenValid(token);
    expect(isTokenValid).toBe(true);
  });
});
