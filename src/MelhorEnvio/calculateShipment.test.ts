import axios from 'axios';
import generateTestToken from '../utils/generateTestToken';
import MelhorEnvio from './index';

jest.mock('axios');
// @ts-ignore
axios.request.mockResolvedValue();

const myDate = new Date();
myDate.setDate(myDate.getDate() + 1);

const token = generateTestToken(myDate.toString());

describe('MelhorEnvio.calculateShipment()', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should call calculateShipment with package with success', async () => {
    // @ts-ignore
    axios.request.mockImplementationOnce(() =>
      Promise.resolve({
        data: [{ id: 1, name: 'Correios' }]
      })
    );

    const me = new MelhorEnvio(token, true);
    const response = await me.calculateShipment(
      '12608220',
      '68637000',
      {
        height: 11,
        length: 20,
        width: 30,
        weight: 0.14
      },
      [],
      [],
      false,
      false,
      200
    );
    expect(response).toEqual([{ id: 1, name: 'Correios' }]);
    expect(axios.request).toHaveBeenCalledTimes(1);
    expect(axios.request).toHaveBeenCalledWith({
      baseURL: 'https://sandbox.melhorenvio.com.br',
      url: '/api/v2/me/shipment/calculate',
      method: 'POST',
      data: {
        from: {
          postal_code: '12608220'
        },
        options: {
          insurance_value: 200,
          own_hand: false,
          receipt: false
        },
        package: {
          height: 11,
          length: 20,
          weight: 0.14,
          width: 30
        },
        to: {
          postal_code: '68637000'
        }
      },
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      params: {},
      timeout: 5000
    });
  });
  it('should call calculateShipment with products and services with success', async () => {
    // @ts-ignore
    axios.request.mockImplementationOnce(() =>
      Promise.resolve({
        data: [{ id: 1, name: 'Correios' }]
      })
    );

    const me = new MelhorEnvio(token, true);
    const response = await me.calculateShipment(
      '12608220',
      '68637000',
      null,
      [
        {
          id: '1',
          height: 11,
          length: 20,
          width: 30,
          weight: 0.14,
          insurance_value: 100,
          quantity: 1
        }
      ],
      ['1', '3'],
      false,
      false,
      200
    );
    expect(response).toEqual([{ id: 1, name: 'Correios' }]);
    expect(axios.request).toHaveBeenCalledTimes(1);
    expect(axios.request).toHaveBeenCalledWith({
      baseURL: 'https://sandbox.melhorenvio.com.br',
      url: '/api/v2/me/shipment/calculate',
      method: 'POST',
      data: {
        from: {
          postal_code: '12608220'
        },
        options: {
          insurance_value: 200,
          own_hand: false,
          receipt: false
        },
        products: [
          {
            height: 11,
            length: 20,
            width: 30,
            weight: 0.14,
            insurance_value: 100,
            id: '1',
            quantity: 1
          }
        ],
        services: '1,3',
        to: {
          postal_code: '68637000'
        }
      },
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      params: {},
      timeout: 5000
    });
  });

  it('should call calculateShipment with products and packages and throw Error', async () => {
    const me = new MelhorEnvio(token, true);
    const response = me.calculateShipment(
      '12608220',
      '68637000',
      {
        height: 11,
        length: 20,
        width: 30,
        weight: 0.14
      },
      [
        {
          id: '1',
          height: 11,
          length: 20,
          width: 30,
          weight: 0.14,
          insurance_value: 100,
          quantity: 1
        }
      ],
      ['1', '3'],
      false,
      false,
      200
    );

    await expect(response).rejects.toThrow(Error);
  });
});
