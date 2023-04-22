/**
 * @type {import('rollup').RollupOptions}
 */

import typescript from '@rollup/plugin-typescript';


export default {
    input: 'src/index.js',
	output: {
		file: './build/index.js',
		format: 'es',
		sourcemap: "inline",
		compact: true,
		minifyInternalExports: true
	},
	plugins: [typescript()]
  };
  