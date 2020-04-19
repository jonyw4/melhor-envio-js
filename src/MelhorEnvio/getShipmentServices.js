/**
 * @typedef {object} MelhorEnvioCompany
 * @property {string} id ID
 */

/**
 * @typedef {object} MelhorEnvioBoxRange
 * @property {string} id ID
 */

/**
 * @typedef {object} MelhorEnvioGetShipmentServicesResponseItem
 * @property {object} restrictions Restriction information
 * @property {object} restrictions.insurance_value Range of insurance allowed
 * @property {object} restrictions.formats A list of allowed formats
 * @property {MelhorEnvioBoxRange} restrictions.formats.box Box format limits
 * @property {MelhorEnvioBoxRange} [restrictions.formats.roll] Roll format limits. (Optional)
 * @property {MelhorEnvioBoxRange} [restrictions.formats.letter] Letter format limits. (Optional)
 * @property {MelhorEnvioCompany} company Company information
 */

/**
 * 📖 Get all services of shipments
 *
 * @alias module:melhor-envio-js#MelhorEnvio~getShipmentServices
 * @returns {Promise.<Array.<MelhorEnvioGetShipmentServicesResponseItem>, (Error)>} Return all services information, or an error if rejected.
 */
export default async function () {
  return this.fetch('/api/v2/me/shipment/services', 'GET');
}
