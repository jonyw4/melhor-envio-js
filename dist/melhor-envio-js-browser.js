(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('axios')) :
  typeof define === 'function' && define.amd ? define(['axios'], factory) :
  (global = global || self, global.MelhorEnvio = factory(global.axios));
}(this, (function (axios) { 'use strict';

  axios = axios && Object.prototype.hasOwnProperty.call(axios, 'default') ? axios['default'] : axios;

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
   * @param {string} method Method. Can be *GET*. *POST*...
   * @param {object} params Querystring params. Its most used in *GET* requests
   * @param {object} data Data. Use for *POST* requests
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

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var browser = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function percentToByte(p) {
    return String.fromCharCode(parseInt(p.slice(1), 16));
  }

  function encode(str) {
    return btoa(encodeURIComponent(str).replace(/%[0-9A-F]{2}/g, percentToByte));
  }

  exports.encode = encode;

  function byteToPercent(b) {
    return `%${`00${b.charCodeAt(0).toString(16)}`.slice(-2)}`;
  }

  function decode(str) {
    return decodeURIComponent(Array.from(atob(str), byteToPercent).join(""));
  }

  exports.decode = decode;
  });

  unwrapExports(browser);
  var browser_1 = browser.encode;
  var browser_2 = browser.decode;

  /**
   * Check if token is valid
   *
   * @param {string} token Token
   * @returns {boolean} Returns true if the token is valid
   */
  function checkTokenValid (token) {
    const tokenParts = token.split('.');
    const tokenPayload = JSON.parse(browser_2(tokenParts[1]));
    const timestamp = tokenPayload.exp;
    const expDate = new Date(timestamp * 1000);
    const todayDate = new Date();
    return expDate > todayDate;
  }

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

  return MelhorEnvio;

})));
