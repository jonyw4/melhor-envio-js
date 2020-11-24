import axios, { Method, AxiosRequestConfig, AxiosError } from 'axios';
import type { Request, Response } from '../types';
import {
  MelhorEnvioFetchOtherError,
  MelhorEnvioFetchClientError,
  MelhorEnvioFetchServerError
} from '../errors';
import checkTokenValid from '../utils/checkTokenValid';

const MENV_SANDBOX_API_URL = 'https://sandbox.melhorenvio.com.br';
const MENV_API_URL = 'https://www.melhorenvio.com.br';

export class MelhorEnvio {
  /**
   * 🚚 Melhor Envio Javascript API
   * @param token Token for API Requests. Can be generated direct in Melhor Envio Dashboard.
   * @param isSandbox Use or not a sandbox environment for testing.
   * @param timeout Timeout of the request.
   * @param appInfo Info about your application
   */
  constructor(
    public token: string,
    public isSandbox = false,
    public timeout = 5000,
    public appInfo?: {
      name: string;
      email: string;
    }
  ) {
    if (!checkTokenValid(token)) {
      throw new Error('Your token has expired');
    }
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
        baseURL: this.isSandbox ? MENV_SANDBOX_API_URL : MENV_API_URL,
        method,
        url,
        timeout: this.timeout,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${this.token}`,
          'User-Agent': this.appInfo
            ? `${this.appInfo.name} (${this.appInfo.email})`
            : undefined
        },
        params,
        data
      })
      .then((response) => response.data)
      .catch((error: AxiosError<any>) => {
        if (error.response) {
          console.log(error.response.data);
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

    if (services) {
      data.services = (Array.isArray(services) && services.length > 0) ? services.join(',') : services;
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

  public async addItemInCart<T, S, NC>(
    data: T & Request.Cart<S, NC>
  ): Promise<Response.Cart> {
    return this.fetch<Response.Cart>('/api/v2/me/cart', 'POST', {}, data);
  }

  public async checkout(data: Request.Shipment.Checkout) {
    return this.fetch<Response.Shipment.Checkout>(
      '/api/v2/me/shipment/checkout',
      'POST',
      {},
      data
    );
  }

  public async generateLabel(data: Request.Shipment.Generate) {
    return this.fetch<Response.Shipment.Generate>(
      '/api/v2/me/shipment/generate',
      'POST',
      {},
      data
    );
  }

  public async printLabel(data: Request.Shipment.Print) {
    return this.fetch<Response.Shipment.Print>(
      '/api/v2/me/shipment/print',
      'POST',
      {},
      data
    );
  }

  public async track(data: Request.Shipment.Tracking) {
    return this.fetch<Response.Shipment.Tracking>(
      '/api/v2/me/shipment/tracking',
      'POST',
      {},
      data
    );
  }
}
