import { encode } from 'universal-base64';

/**
 * Generate a test token
 */
export default function generateTestToken(date: string) {
  const payload = encode(
    JSON.stringify({
      exp: (new Date(date).getTime() / 1000),
    }),
  );

  return `abc.${payload}`;
}
