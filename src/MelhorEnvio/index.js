import fetch from './fetch';
import checkTokenValid from '../utils/checkTokenValid';

/**
 * @class
 * @alias module:melhor-envio-js#MelhorEnvio
 * @param {string} token Token for API Requests. Can be generated direct in Melhor Envio Dashboard.
 * @param {boolean} isSandbox Use or not a sandbox enviroment for testing.
 * @param {number} timeout Timeout of the request
 */
function MelhorEnvio(token, isSandbox = false, timeout = 5000) {
  if (!checkTokenValid(token)) {
    throw new Error('Expired token');
  }
  this.token = token;
  this.isSandbox = isSandbox;
  this.timeout = timeout;
}
MelhorEnvio.prototype = {};
MelhorEnvio.prototype.constructor = MelhorEnvio;
MelhorEnvio.prototype.fetch = fetch;

/**
 * @module melhor-envio-js
 */

export default MelhorEnvio;
