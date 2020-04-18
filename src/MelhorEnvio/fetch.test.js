import axios from 'axios';
import MelhorEnvio from './index';
import {
  AxiosTestError,
  MelhorEnvioFetchServerError,
  MelhorEnvioFetchClientError,
  MelhorEnvioFetchOtherError,
} from '../errors';

jest.mock('axios');
axios.mockResolvedValue();

describe('MelhorEnvio.fetch()', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should fetch a GET request successfully from RTE API', async () => {
    axios.mockImplementationOnce(() => Promise.resolve({
      data: { access_token: 'token123' },
    }));

    const me = new MelhorEnvio('token123', true);
    const response = await me.fetch(
      '/token',
      'GET',
      {},
      {},
    );

    expect(response).toEqual({ access_token: 'token123' });
    expect(axios).toHaveBeenCalledTimes(1);
    expect(axios).toHaveBeenCalledWith({
      baseURL: 'https://sandbox.melhorenvio.com.br',
      url: '/token',
      method: 'GET',
      data: {},
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer token123',
        'Content-Type': 'application/json',
      },
      params: {},
      timeout: 5000,
    });
  });

  it('should fetch an MelhorEnvioOtherError from RTE API', async () => {
    axios.mockRejectedValue(new AxiosTestError({}));
    const me = new MelhorEnvio('token123');
    const fetch = me.fetch('/test', 'GET');
    await expect(fetch).rejects.toThrow(MelhorEnvioFetchOtherError);
  });

  it('should fetch an MelhorEnvioFetchClientError from RTE API', async () => {
    axios.mockRejectedValue(new AxiosTestError({ request: {} }));
    const me = new MelhorEnvio('token123');
    const fetch = me.fetch('/test', 'GET');
    await expect(fetch).rejects.toThrow(MelhorEnvioFetchClientError);
  });

  it('should fetch an MelhorEnvioFetchServerError from RTE API', async () => {
    axios.mockRejectedValue(new AxiosTestError({ response: { status: 404 } }));
    const me = new MelhorEnvio('token123');
    const fetch = me.fetch('/test', 'GET');
    await expect(fetch).rejects.toThrow(MelhorEnvioFetchServerError);
  });
});
