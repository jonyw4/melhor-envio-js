import {
  MelhorEnvioFetchOtherError,
  MelhorEnvioFetchClientError,
  MelhorEnvioFetchServerError
} from '.';

describe('MelhorEnvioFetchErrors', () => {
  it('should throw Error of type MelhorEnvioFetchOtherError', () => {
    const t = () => {
      throw new MelhorEnvioFetchOtherError();
    };
    expect(t).toThrow(MelhorEnvioFetchOtherError);
  });

  it('should throw Error of type MelhorEnvioFetchClientError', () => {
    const t = () => {
      throw new MelhorEnvioFetchClientError();
    };
    expect(t).toThrow(MelhorEnvioFetchClientError);
  });

  it('should throw Error of type MelhorEnvioFetchServerError', () => {
    const t = () => {
      throw new MelhorEnvioFetchServerError(404);
    };
    expect(t).toThrow(MelhorEnvioFetchServerError);
  });
});
