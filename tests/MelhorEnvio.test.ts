import MelhorEnvio, { ShippingMethods } from '../src';
describe('E2E MelhorEnvio', () => {
  const me = new MelhorEnvio(String(process.env.API_ME_TOKEN), true, 20000);

  it('should get getShipmentServices', async () => {
    const response = await me.getShipmentServices();
    // console.log(response);
    expect(response).toBeTruthy();
  });

  it('should get calculateShipment ', async () => {
    const response = await me.calculateShipment({
      fromPostalCode: '12608220',
      toPostalCode: '68637000',
      productsOrPackageData: {
        height: 11,
        length: 20,
        width: 30,
        weight: 0.14
      },
      services: null,
      receipt: false,
      ownHand: false,
      insuranceValue: 200
    });
    // console.log(response);
    expect(response).toBeTruthy();
  });
  describe('checkout proccess', () => {
    let id = '';
    it('should get addItemInCart ', async () => {
      const response = await me.addItemInCart({
        service: ShippingMethods.CorreiosSEDEX,
        agency: null,
        from: {
          name: 'João',
          document: '227.448.790-10',
          phone: '1299999999',
          email: 'test@test.com',
          state_register: 'SP',
          address: 'Rua A',
          complement: 'Casa',
          number: '10',
          district: 'Vila Hepacaré',
          state_abbr: 'SP',
          city: 'Lorena',
          country_id: 'BR',
          postal_code: '12608160'
        },
        to: {
          name: 'Jose',
          document: '345.700.880-90',
          phone: '1299999999',
          email: 'test@test.com',
          state_register: 'SP',
          address: 'Rua A',
          complement: 'Casa',
          number: '10',
          district: 'Vila Hepacaré',
          state_abbr: 'SP',
          city: 'Lorena',
          country_id: 'BR',
          postal_code: '12608160'
        },
        products: undefined,
        volumes: [
          {
            height: 11,
            length: 20,
            width: 30,
            weight: 0.14
          }
        ],
        options: {
          insurance_value: 200,
          receipt: false,
          own_hand: false,
          reverse: false,
          non_commercial: true,
          invoice: null,
          platform: 'Test'
        }
      });
      // console.log(response);
      expect(response).toBeTruthy();
      id = response.id;
    });
    it('should get checkout ', async () => {
      const response = await me.checkout({ orders: [id] });
      // console.log(response);
      expect(response).toBeTruthy();
    });
    it('should get generateLabel ', async () => {
      const response = await me.generateLabel({ orders: [id] });
      // console.log(response);
      expect(response).toBeTruthy();
    });
    it('should get printLabel ', async () => {
      const response = await me.printLabel({ orders: [id], mode: 'public' });
      // console.log(response);
      expect(response).toBeTruthy();
    });
    it('should get tracking ', async () => {
      const response = await me.track({ orders: [id] });
      // console.log(response);
      expect(response).toBeTruthy();
    });
  });
});
