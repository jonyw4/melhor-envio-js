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
 * @typedef {object} MelhorEnvioGetShipmentCalculateShipmentResponseItem
 * @property {number} Id Id
 * @property {string} name Name
 * @property {number} price Shipment Price
 * @property {number} custom_price Custom price
 * @property {number} discount Discount
 * @property {string} currency Currency
 * @property {number} delivery_time Delivery time in days
 * @property {object} delivery_range Range of delivery in days
 * @property {number} delivery_range.min Minimum value for delivery in days
 * @property {number} delivery_range.max Maximum value for delivery in days
 * @property {number} custom_delivery_time Custom delivery time
 * @property {object} custom_delivery_range Range of custom delivery
 * @property {number} custom_delivery_range.min Minimum value for custom delivery
 * @property {number} custom_delivery_range.max Maximum value for custom delivery
 * @property {Array} packages Packages
 * @property {object} additional_services Additional Services
 * @property {boolean} additional_services.receipt If the additional service receipt is active
 * @property {boolean} additional_services.own_hand If the additional service own hand is active
 * @property {boolean} additional_services.collect If the shipment will be collected
 * @property {MelhorEnvioCompany} company Company information
 */

/**
 * 💵 Calculate quote for shipment
 *
 * @alias module:melhor-envio-js#MelhorEnvio~calculateShipment
 * @param {string} fromPostalCode Origin Postal Code
 * @param {string} toPostalCode Destination Postal Code
 * @param {MelhorEnvioPackage} [packageData=null] All data of package. **If you chose these option you cant choose `productsData`**
 * @param {Array.<MelhorEnvioCalculateShipmentProduct>} [productsData=[]] A list of product required for calculate quote. **If you chose these option you cant choose `packageData`**
 * @param {Array} [services=[]] A list of services ID that you want to get in response (Optional)
 * @param {boolean} [receipt=false] If you want a receipt service (Optional)
 * @param {boolean} [ownHand=false] If you want a own hand service (Optional)
 * @param {number} [insuranceValue=0] **Used only if you use packageData**. Value for the insurance (Optional)
 * @returns {Promise.<Array.<MelhorEnvioGetShipmentCalculateShipmentResponseItem>, (Error)>} Return all shipment quote, or an error if rejected. (Optional)
 */
export default async function (
  fromPostalCode,
  toPostalCode,
  packageData = null,
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
  if ((packageData && Object.keys(packageData).length > 0) && productsData.length > 0) {
    throw new Error('You need to choose between package or product to calculate shipment');
  } else if (packageData && Object.keys(packageData).length > 0) {
    data.package = packageData;
  } else if (productsData.length > 0) {
    data.products = productsData;
  }
  return this.fetch('/api/v2/me/shipment/calculate', 'POST', {}, data);
}
