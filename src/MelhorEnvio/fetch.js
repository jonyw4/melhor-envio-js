import axios from 'axios';
import {
  MelhorEnvioFetchOtherError,
  MelhorEnvioFetchClientError,
  MelhorEnvioFetchServerError,
} from '../errors';

/**
 * **FOR INTERNAL USE** - 📨 Fetch in the RTE API
 *
 * @alias module:melhor-envio-js#MelhorEnvio~fetch
 * @param {string} url URL. Route to the fetch. can be `/test`
 * @param {import('axios').Method} [method=GET] Method. Can be *GET*. *POST*.
 * @param {object} [params={}] Querystring params. Its most used in *GET* requests. (Optional)
 * @param {object} [data={}] Data. Use for *POST* requests. (Optional)
 * @returns {Promise.<any, (Error)>} Data response of the fetch, or an error if rejected.
 */
export default async function (
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
