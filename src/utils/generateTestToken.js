import { encode } from 'universal-base64';

/**
 * Generate a test token
 *
 * @param {string} date date
 * @returns {string} a new token for test
 */
export default function generateTestToken(date) {
  const payload = encode(
    JSON.stringify({
      exp: (new Date(date).getTime() / 1000),
    }),
  );

  return `abc.${payload}`;
}
