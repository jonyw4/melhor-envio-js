import axios from 'axios';
import generateTestToken from '../utils/generateTestToken';
import MelhorEnvio from './index';
import {
  AxiosTestError,
  MelhorEnvioFetchServerError,
  MelhorEnvioFetchClientError,
  MelhorEnvioFetchOtherError,
} from '../errors';

jest.mock('axios');
axios.mockResolvedValue();

const myDate = new Date();
myDate.setDate(myDate.getDate() + 1);

const token = generateTestToken(myDate.toString());

describe('MelhorEnvio.fetch()', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should fetch a GET request successfully from ME API', async () => {
    axios.mockImplementationOnce(() => Promise.resolve({
      data: { access_token: 'token123' },
    }));

    const me = new MelhorEnvio(token, true);
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
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      params: {},
      timeout: 5000,
    });
  });

  it('should fetch an MelhorEnvioOtherError from ME API', async () => {
    axios.mockRejectedValue(new AxiosTestError({}));
    const me = new MelhorEnvio(token);
    const fetch = me.fetch('/test', 'GET');
    await expect(fetch).rejects.toThrow(MelhorEnvioFetchOtherError);
  });

  it('should fetch an MelhorEnvioFetchClientError from ME API', async () => {
    axios.mockRejectedValue(new AxiosTestError({ request: {} }));
    const me = new MelhorEnvio(token);
    const fetch = me.fetch('/test', 'GET');
    await expect(fetch).rejects.toThrow(MelhorEnvioFetchClientError);
  });

  it('should fetch an MelhorEnvioFetchServerError from ME API', async () => {
    axios.mockRejectedValue(new AxiosTestError({ response: { status: 404 } }));
    const me = new MelhorEnvio(token);
    const fetch = me.fetch('/test', 'GET');
    await expect(fetch).rejects.toThrow(MelhorEnvioFetchServerError);
  });
});
