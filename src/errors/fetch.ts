class AxiosTestError extends Error {
  config: any;
  code: any;
  request: any;
  response: any;
  isAxiosError: boolean;
  constructor({
    message = 'Axios Test Error',
    config = '',
    code = '',
    request = '',
    response = ''
  }: {
    message?: any;
    config?: any;
    code?: any;
    request?: any;
    response?: any;
    isAxiosError?: boolean;
  }) {
    super(message);

    this.config = config;
    this.code = code;
    this.request = request;
    this.response = response;
    this.isAxiosError = true;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

class MelhorEnvioFetchServerError extends Error {
  /**
   * Creates an instance of MelhorEnvioFetchServerError.
   *
   * @param status Status Code passed from the server
   */
  constructor(status: number) {
    super(`Server error status ${status} `);
    this.name = 'MelhorEnvioFetchServerError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

class MelhorEnvioFetchClientError extends Error {
  /**
   * Creates an instance of MelhorEnvioFetchClientError.
   */
  constructor() {
    super('Client error');
    this.name = 'MelhorEnvioFetchClientError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

class MelhorEnvioFetchOtherError extends Error {
  /**
   * Creates an instance of MelhorEnvioFetchOtherError.
   */
  constructor() {
    super('Other Error');
    this.name = 'MelhorEnvioFetchOtherError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export {
  AxiosTestError,
  MelhorEnvioFetchServerError,
  MelhorEnvioFetchClientError,
  MelhorEnvioFetchOtherError
};
