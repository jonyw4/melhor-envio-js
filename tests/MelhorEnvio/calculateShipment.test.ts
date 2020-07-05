import MelhorEnvio from '../../src';

test('call calculateShipment and check response', async () => {
  const me = new MelhorEnvio(process.env.API_ME_TOKEN, true, 20000);
  const response = await me.calculateShipment(
    '12608220',
    '68637000',
    {
      height: 11,
      length: 20,
      width: 30,
      weight: 0.14,
    },
    [],
    [],
    false,
    false,
    200,
  );
  // console.log(response);
  expect(response).toBeTruthy();
});
