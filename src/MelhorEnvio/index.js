import fetch from './fetch';
import getShipmentServices from './getShipmentServices';
import calculateShipment from './calculateShipment';
import checkTokenValid from '../utils/checkTokenValid';

/**
 * @class
 * @alias module:melhor-envio-js#MelhorEnvio
 * @param {string} token Token for API Requests. Can be generated direct in Melhor Envio Dashboard.
 * @param {boolean} [isSandbox=false] Use or not a sandbox environment for testing. (Optional)
 * @param {number} [timeout=5000] Timeout of the request. (Optional)
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
MelhorEnvio.prototype.getShipmentServices = getShipmentServices;
MelhorEnvio.prototype.calculateShipment = calculateShipment;

/**
 * @module melhor-envio-js
 */

export default MelhorEnvio;
