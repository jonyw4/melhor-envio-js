import generateTestToken from './generateTestToken';

describe('generateTestToken()', () => {
  test('should generate token properly', async () => {
    const token = generateTestToken('2020-03-01');
    expect(token).toBe('abc.eyJleHAiOjE1ODMwMjA4MDB9');
  });
});
