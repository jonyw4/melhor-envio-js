import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

const input = 'src/index.js';
const defaultPlugins = [
  babel({
    exclude: '/node_modules/',
    include: [/node_modules\/universal-base64/],
  }),
];

export default [
  {
    input,
    external: ['axios'],
    plugins: [].concat(defaultPlugins, [
      resolve({
        skip: ['universal-base64'],
      }),
      commonjs(),
    ]),
    output: {
      globals: {
        axios: 'axios',
      },
      file: 'dist/melhor-envio-js.js',
      format: 'umd',
      name: 'MelhorEnvio',
    },
  },
  {
    input,
    external: ['axios'],
    plugins: [].concat(defaultPlugins, [
      resolve({
        browser: true,
        skip: ['universal-base64'],
      }),
      commonjs(),
    ]),
    context: 'window',
    output: {
      globals: {
        axios: 'axios',
      },
      file: 'dist/melhor-envio-js-browser.js',
      format: 'umd',
      name: 'MelhorEnvio',
    },
  },
  {
    input,
    external: ['axios', 'universal-base64'],
    plugins: resolve(),
    output: {
      file: 'dist/melhor-envio-js-esm.js',
      format: 'es',
      name: 'MelhorEnvio',
    },
  },
];
