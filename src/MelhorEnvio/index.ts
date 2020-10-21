import axios, { Method, AxiosRequestConfig, AxiosError } from 'axios';
import type {
  MelhorEnvioCalculateShipmentProduct,
  MelhorEnvioPackage,
  Request,
  Response
} from '../types';
import {
  MelhorEnvioFetchOtherError,
  MelhorEnvioFetchClientError,
  MelhorEnvioFetchServerError
} from '../errors';
import checkTokenValid from '../utils/checkTokenValid';

class MelhorEnvio {
  token: string;
  isSandbox: boolean;
  timeout: number;

  /**
   * 🚚 Melhor Envio Javascript API
   * @param token Token for API Requests. Can be generated direct in Melhor Envio Dashboard.
   * @param isSandbox Use or not a sandbox environment for testing.
   * @param timeout Timeout of the request.
   */
  constructor(token: string, isSandbox = false, timeout = 5000) {
    if (!checkTokenValid(token)) {
      throw new Error('Your token has expired');
    }
    this.token = token;
    this.isSandbox = isSandbox;
    this.timeout = timeout;
  }

  private sanitizePostalCode(postalCode: string): string {
    return postalCode.toString().replace(/\D+/g, '');
  }

  /**
   * 📨 Fetch in the MelhorEnvio API
   *
   * @param url URL. Route to the fetch. can be `/test`
   * @param method Method. Can be *GET*. *POST*.
   * @param params Querystring params. Its most used in *GET* requests.
   * @param data Data. Use for *POST* requests.
   */
  public async fetch<T = any>(
    url: string,
    method: Method = 'GET',
    params: AxiosRequestConfig['params'] = {},
    data: AxiosRequestConfig['data'] = {}
  ): Promise<T> {
    return axios
      .request<any, Response.Server<T>>({
        baseURL: this.isSandbox
          ? 'https://sandbox.melhorenvio.com.br'
          : 'https://www.melhorenvio.com.br',
        method,
        url,
        timeout: this.timeout,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${this.token}`
        },
        params,
        data
      })
      .then((response) => response.data)
      .catch((error: AxiosError<any>) => {
        if (error.response) {
          throw new MelhorEnvioFetchServerError(
            error.message,
            error.config,
            error.code,
            error.request,
            error.response
          );
        } else if (error.request) {
          throw new MelhorEnvioFetchClientError(
            error.message,
            error.config,
            error.code,
            error.request
          );
        } else {
          throw new MelhorEnvioFetchOtherError(error.message, error.config);
        }
      });
  }

  /**
   * 💵 Calculate quote for shipment
   */
  public async calculateShipment<T extends Request.Shipment.Calculate>({
    fromPostalCode,
    toPostalCode,
    productsOrPackageData,
    services,
    receipt = false,
    ownHand = false,
    insuranceValue = 0
  }: T): Promise<Response.Shipment.Calculate<T['services']>> {
    const data: any = {
      from: {
        postal_code: this.sanitizePostalCode(fromPostalCode)
      },
      to: {
        postal_code: this.sanitizePostalCode(toPostalCode)
      },
      options: {
        receipt,
        own_hand: ownHand,
        insurance_value: insuranceValue
      }
    };

    if (services && Array.isArray(services) && services.length > 0) {
      data.services = services.join(',');
    }
    if (Array.isArray(productsOrPackageData)) {
      data.products = productsOrPackageData;
    } else {
      data.package = productsOrPackageData;
    }

    return this.fetch<Response.Shipment.Calculate<T['services']>>(
      '/api/v2/me/shipment/calculate',
      'POST',
      {},
      data
    );
  }

  public async getShipmentServices(): Promise<Response.Shipment.Services> {
    return this.fetch<Response.Shipment.Services>(
      '/api/v2/me/shipment/services',
      'GET'
    );
  }
}

export default MelhorEnvio;
