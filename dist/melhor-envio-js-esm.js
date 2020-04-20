import axios from 'axios';
import { decode } from 'universal-base64';

/* eslint-disable max-classes-per-file */

/**
 * @class
 * @augments Error
 */
class MelhorEnvioFetchServerError extends Error {
  /**
   * Creates an instance of MelhorEnvioFetchServerError.
   *
   * @param {string} status Status Code passed from the server
   * @memberof MelhorEnvioFetchServerError
   */
  constructor(status) {
    super(`Server error status ${status} `);
    this.name = 'MelhorEnvioFetchServerError';
  }
}

/**
 * @class
 * @augments Error
 */
class MelhorEnvioFetchClientError extends Error {
  /**
   * Creates an instance of MelhorEnvioFetchClientError.
   *
   * @memberof MelhorEnvioFetchClientError
   */
  constructor() {
    super('Client error');
    this.name = 'MelhorEnvioFetchClientError';
  }
}

/**
 * @class
 * @augments Error
 */
class MelhorEnvioFetchOtherError extends Error {
  /**
   * Creates an instance of MelhorEnvioFetchOtherError.
   *
   * @memberof MelhorEnvioFetchOtherError
   */
  constructor() {
    super('Other Error');
    this.name = 'MelhorEnvioFetchOtherError';
  }
}

/**
 * **FOR INTERNAL USE** - 📨 Fetch in the RTE API
 *
 * @alias module:melhor-envio-js#MelhorEnvio~fetch
 * @param {string} url URL. Route to the fetch. can be `/test`
 * @param {string} [method=GET] Method. Can be *GET*. *POST*.
 * @param {object} [params={}] Querystring params. Its most used in *GET* requests. (Optional)
 * @param {object} [data={}] Data. Use for *POST* requests. (Optional)
 * @returns {Promise.<any, (Error)>} Data response of the fetch, or an error if rejected.
 */
async function fetch (
  url,
  method = 'GET',
  params = {},
  data = {},
) {
  try {
    const response = await axios({
      baseURL: this.isSandbox
        ? 'https://sandbox.melhorenvio.com.br'
        : 'https://www.melhorenvio.com.br',
      method,
      url,
      timeout: this.timeout,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
      params,
      data,
    });
    return response.data;
  } catch (error) {
    // console.log(error);
    if (error.response) {
      throw new MelhorEnvioFetchServerError(error.response.status);
    } else if (error.request) {
      throw new MelhorEnvioFetchClientError();
    } else {
      throw new MelhorEnvioFetchOtherError();
    }
  }
}

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
async function getShipmentServices () {
  return this.fetch('/api/v2/me/shipment/services', 'GET');
}

/**
 * @typedef {object} MelhorEnvioPackage
 * @property {number} width Width (cm)
 * @property {number} height Height (cm)
 * @property {number} length Length (cm)
 * @property {number} weight Weigh (kg)
 */

/**
 * @typedef {object} MelhorEnvioCalculateShipmentProduct
 * @property {string} id ID
 * @property {number} width Width (cm)
 * @property {number} height Height (cm)
 * @property {number} length Length (cm)
 * @property {number} weight Weigh (kg)
 * @property {number} insurance_value Value for the insurance
 * @property {number} quantity Qty of items
 */

/**
 * @typedef {object} MelhorEnvioGetShipmentCalculateShipmentItem
 * @property {MelhorEnvioCompany} company Company information
 * @property {string} [error] A message of error. (Only if don't return information)
 */

/**
 * 💵 Calculate quote for shipment
 *
 * @alias module:melhor-envio-js#MelhorEnvio~calculateShipment
 * @param {string} fromPostalCode Origin Postal Code
 * @param {string} toPostalCode Destination Postal Code
 * @param {MelhorEnvioPackage} [packageData={}] All data of package. **If you chose these option you cant choose `productsData`**
 * @param {Array.<MelhorEnvioCalculateShipmentProduct>} [productsData=[]] A list of product required for calculate quote. **If you chose these option you cant choose `packageData`**
 * @param {Array} [services=[]] A list of services ID that you want to get in response (Optional)
 * @param {boolean} [receipt=false] If you want a receipt service (Optional)
 * @param {boolean} [ownHand=false] If you want a own hand service (Optional)
 * @param {number} [insuranceValue=0] **Used only if you use packageData**. Value for the insurance (Optional)
 * @returns {Promise.<Array.<MelhorEnvioGetShipmentCalculateShipmentItem>, (Error)>} Return all shipment quote, or an error if rejected. (Optional)
 */
async function calculateShipment (
  fromPostalCode,
  toPostalCode,
  packageData = {},
  productsData = [],
  services = [],
  receipt = false,
  ownHand = false,
  insuranceValue = 0,
) {
  const data = {
    from: {
      postal_code: fromPostalCode,
    },
    to: {
      postal_code: toPostalCode,
    },
    options: {
      receipt,
      own_hand: ownHand,
      insurance_value: insuranceValue,
    },
  };

  if (services.length > 0) {
    data.services = services.join(',');
  }
  if (Object.keys(packageData).length > 0 && productsData.length > 0) {
    throw new Error('You need to choose between package or product to calculate shipment');
  } else if (Object.keys(packageData).length > 0) {
    data.package = packageData;
  } else if (productsData.length > 0) {
    data.products = productsData;
  }
  return this.fetch('/api/v2/me/shipment/calculate', 'POST', {}, data);
}

/**
 * Check if token is valid
 *
 * @param {string} token Token
 * @returns {boolean} Returns true if the token is valid
 */
function checkTokenValid (token) {
  const tokenParts = token.split('.');
  const tokenPayload = JSON.parse(decode(tokenParts[1]));
  const timestamp = tokenPayload.exp;
  const expDate = new Date(timestamp * 1000);
  const todayDate = new Date();
  return expDate > todayDate;
}

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
