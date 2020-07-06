import axios, { Method, AxiosRequestConfig } from 'axios';
import type {
  MelhorEnvioPackage,
  MelhorEnvioCalculateShipmentProduct,
  MelhorEnvioGetShipmentCalculateShipmentResponseItem,
  MelhorEnvioGetShipmentServicesResponseItem,
  ServerResponse
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
  ) {
    try {
      const response = await axios.request<any, ServerResponse<T>>({
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
      });
      return response.data;
    } catch (error) {
      console.log(error);
      if (error.response) {
        throw new MelhorEnvioFetchServerError(error.response.status);
      } else if (error.request) {
        throw new MelhorEnvioFetchClientError();
      } else {
        throw new MelhorEnvioFetchOtherError();
      }
    }
  }

  /**
   * 💵 Calculate quote for shipment
   *
   * @param fromPostalCode Origin Postal Code
   * @param toPostalCode Destination Postal Code
   * @param packageData All data of package. **If you chose these option you cant choose `productsData`**
   * @param productsData A list of product required for calculate quote. **If you chose these option you cant choose `packageData`**
   * @param services A list of services ID that you want to get in response
   * @param receipt If you want a receipt service
   * @param ownHand If you want a own hand service
   * @param insuranceValue **Used only if you use packageData**. Value for the insurance
   */
  public async calculateShipment<ServiceArgs = Array<string> | string | null>(
    fromPostalCode: string,
    toPostalCode: string,
    productsOrPackageData:
      | MelhorEnvioPackage
      | MelhorEnvioCalculateShipmentProduct[],
    services: ServiceArgs,
    receipt = false,
    ownHand = false,
    insuranceValue = 0
  ) {
    const data: any = {
      from: {
        postal_code: fromPostalCode
      },
      to: {
        postal_code: toPostalCode
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

    return this.fetch<
      ServiceArgs extends string
        ? MelhorEnvioGetShipmentCalculateShipmentResponseItem
        : MelhorEnvioGetShipmentCalculateShipmentResponseItem[]
    >('/api/v2/me/shipment/calculate', 'POST', {}, data);
  }

  public async getShipmentServices() {
    return this.fetch<MelhorEnvioGetShipmentServicesResponseItem>(
      '/api/v2/me/shipment/services',
      'GET'
    );
  }
}

export default MelhorEnvio;