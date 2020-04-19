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
export default async function (
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
