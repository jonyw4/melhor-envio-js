# Melhor Envio Client API

[![npm (scoped)](https://img.shields.io/npm/v/menv-js.svg)](https://www.npmjs.com/package/menv-js)
![Build Status](https://github.com/jonyw4/melhor-envio-js/workflows/Test,%20build%20and%20deploy/badge.svg)
[![codecov](https://codecov.io/gh/jonyw4/melhor-envio-js/branch/master/graph/badge.svg)](https://codecov.io/gh/jonyw4/melhor-envio-js)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

A JavaScript library to interface with Melhor Envio API, it works with Node.js. The [documentation can be found here](https://jonyw4.github.io/melhor-envio-js/).

## 🌟 Features
This library its in **early stages**, so it doesn't have interfaces for all MelhorEnvio features (Your PR is very welcome).

With this library you can:
- Get Shipment Services
- Calculate Shipment

## 📖 How to use?
Install the library
```bash
npm i menv-js
```

Import the library
```typescript
import MelhorEnvio from 'menv-js';

const menv = new MelhorEnvio(token, isSandbox, timeout);
const response = await menv.getShipmentServices();
```

## 📚 API Docs

This library provides a promise based interface for all functions. Before you
can use the library, you need to provide authentication details which will be
used through API calls.

For a detailed documentation, see our [Documentation](https://jonyw4.github.io/melhor-envio-js/).

## 😍 Do you like?
*Please, consider supporting my work as a lot of effort takes place to create this repo! Thanks a lot.*

<a href="https://www.buymeacoffee.com/jonycelio" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-yellow.png" alt="Buy Me A Coffee" style="height: 51px !important;width: 217px !important;" ></a>