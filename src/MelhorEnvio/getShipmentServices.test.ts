import axios from 'axios';
import { ShippingMethods } from '../types';
import generateTestToken from '../utils/generateTestToken';
import MelhorEnvio from './index';

jest.mock('axios');
axios.request.mockResolvedValue();

const myDate = new Date();
myDate.setDate(myDate.getDate() + 1);

const token = generateTestToken(myDate.toString());

describe('MelhorEnvio.getShipmentServices()', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should call getShipmentServices API with success', async () => {
    axios.request.mockImplementationOnce(() =>
      Promise.resolve({
        data: [{ id: 1, name: 'Correios' }]
      })
    );

    const me = new MelhorEnvio(token, true);
    const x = await me.addItemInCart({
      service: ShippingMethods.CorreiosPac,
      agency: null,
      options: {
        insurance_value: 100,
        receipt: false,
        own_hand: false,
        non_commercial: true,
        reverse: false,
        platform: 'x',
        invoice: null
      }
    });
    const response = await me.getShipmentServices();
    expect(response).toEqual([{ id: 1, name: 'Correios' }]);
    expect(axios.request).toHaveBeenCalledTimes(1);
    expect(axios.request).toHaveBeenCalledWith({
      baseURL: 'https://sandbox.melhorenvio.com.br',
      url: '/api/v2/me/shipment/services',
      method: 'GET',
      data: {},
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      params: {},
      timeout: 5000
    });
  });
});
