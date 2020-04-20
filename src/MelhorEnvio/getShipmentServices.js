/**
 * @typedef {object} MelhorEnvioCompany
 * @property {number} id Id
 * @property {string} name Name
 * @property {string} picture Picture
 */

/**
 * @typedef {object} MelhorEnvioBoxRange
 * @property {object} weight Range of weight
 * @property {number} weight.min Minimum value for weight
 * @property {number} weight.max Maximum value for weight
 * @property {object} width Range of width
 * @property {number} width.min Minimum value for width
 * @property {number} width.max Maximum value for width
 * @property {object} height Range of height
 * @property {number} height.min Minimum value for height
 * @property {number} height.max Maximum value for height
 * @property {object} length Range of length
 * @property {number} length.min Minimum value for length
 * @property {number} length.max Maximum value for length
 * @property {number} sum sum
 */

/**
 * @typedef {object} MelhorEnvioGetShipmentServicesResponseItem
 * @property {number} id Id
 * @property {string} name Name
 * @property {string} type Type
 * @property {string} range range
 * @property {object} restrictions Restriction information
 * @property {object} restrictions.insurance_value Range of insurance allowed
 * @property {number} restrictions.insurance_value.min Minimum value for insurance
 * @property {number} restrictions.insurance_value.max Maximum value for insurance
 * @property {object} restrictions.formats A list of allowed formats
 * @property {MelhorEnvioBoxRange} restrictions.formats.box Box format limits
 * @property {MelhorEnvioBoxRange} [restrictions.formats.roll] Roll format limits
 * @property {MelhorEnvioBoxRange} [restrictions.formats.letter] Letter format limits
 * @property {Array} requirements Requirements
 * @property {Array} optionals optionals services
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
