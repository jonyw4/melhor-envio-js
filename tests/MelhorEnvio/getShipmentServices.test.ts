import MelhorEnvio from '../../src';

test('call getShipmentServices and check response', async () => {
  const me = new MelhorEnvio(process.env.API_ME_TOKEN, true, 20000);
  const response = await me.getShipmentServices();
  // console.log(response);
  expect(response).toBeTruthy();
});
