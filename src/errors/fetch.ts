class AxiosTestError extends Error {
  config: string;
  code: string;
  request: string;
  response: string;
  isAxiosError: boolean;
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

class MelhorEnvioFetchServerError extends Error {
  /**
   * Creates an instance of MelhorEnvioFetchServerError.
   *
   * @param status Status Code passed from the server
   */
  constructor(status:number) {
    super(`Server error status ${status} `);
    this.name = 'MelhorEnvioFetchServerError';
  }
}

class MelhorEnvioFetchClientError extends Error {
  /**
   * Creates an instance of MelhorEnvioFetchClientError.
   */
  constructor() {
    super('Client error');
    this.name = 'MelhorEnvioFetchClientError';
  }
}

class MelhorEnvioFetchOtherError extends Error {
  /**
   * Creates an instance of MelhorEnvioFetchOtherError.
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
