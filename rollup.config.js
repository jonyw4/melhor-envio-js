import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

const input = 'src/index.js';
const defaultPlugins = [babel({ exclude: '/node_modules/' })];

export default [
  {
    input,
    external: ['axios'],
    plugins: [].concat(defaultPlugins, [commonjs()]),
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
];
