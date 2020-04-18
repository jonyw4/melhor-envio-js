/* eslint-disable max-classes-per-file */

/**
 * @class
 * @augments {Error}
 */
class AxiosTestError extends Error {
  constructor({
    message = 'Axios Test Error',
    config = '',
    code = '',
    request = '',
    response = '',
  }) {
    super(message);

    this.config = config;
    this.code = code;
    this.request = request;
    this.response = response;
    this.isAxiosError = true;
  }
}

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

export {
  AxiosTestError,
  MelhorEnvioFetchServerError,
  MelhorEnvioFetchClientError,
  MelhorEnvioFetchOtherError,
};
