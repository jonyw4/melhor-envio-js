import {
  MelhorEnvioFetchOtherError,
  MelhorEnvioFetchClientError,
  MelhorEnvioFetchServerError
} from '.';

describe('MelhorEnvioFetchErrors', () => {
  it('should throw Error of type MelhorEnvioFetchOtherError', () => {
    const t = () => {
      throw new MelhorEnvioFetchOtherError('Erro', {});
    };
    expect(t).toThrow(MelhorEnvioFetchOtherError);
  });

  it('should throw Error of type MelhorEnvioFetchClientError', () => {
    const t = () => {
      throw new MelhorEnvioFetchClientError('Client error', {}, '400', {});
    };
    expect(t).toThrow(MelhorEnvioFetchClientError);
  });

  it('should throw Error of type MelhorEnvioFetchServerError', () => {
    const t = () => {
      throw new MelhorEnvioFetchServerError(
        'Client error',
        {},
        '400',
        {},
        {
          data: {},
          status: 500,
          statusText: 'Server Error',
          headers: {},
          config: {}
        }
      );
    };
    expect(t).toThrow(MelhorEnvioFetchServerError);
  });
});
