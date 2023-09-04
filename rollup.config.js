/**
 * @type {import('rollup').RollupOptions}
 */

import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';


export default {
    input: 'src/index.js',
	output: {
		file: './build/index.js',
		format: 'iife',
		compact: true,
		minifyInternalExports: true
	},
	plugins: [typescript()]
  };
  