import { decode } from 'universal-base64';

/**
 * Check if token is valid
 */
export default function checkTokenValid(token: string) {
  const tokenParts = token.split('.');
  const tokenPayload = JSON.parse(decode(tokenParts[1]));
  const timestamp = tokenPayload.exp;
  const expDate = new Date(timestamp * 1000);
  const todayDate = new Date();
  return expDate > todayDate;
}
