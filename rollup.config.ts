import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import camelCase from 'lodash.camelcase'
import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'
import { terser } from 'rollup-plugin-terser'

const libraryName = 'white-react-use'
const cameCaseName = camelCase(libraryName)

export default {
  input: 'src/index.ts',
  output: [
    {
      file: `dist/${cameCaseName}.js`,
      name: cameCaseName,
      format: 'umd',
      sourcemap: true,
      globals: { react: 'React' }
    },
    {
      file: `dist/${cameCaseName}.min.js`,
      name: cameCaseName,
      format: 'umd',
      sourcemap: true,
      globals: { react: 'React' },
    },
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [
    'react'
  ],
  watch: {
    include: 'src/**',
  },
  plugins: [
    // Allow json resolution
    json(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),
    // Compile TypeScript files
    typescript({ useTsconfigDeclarationDir: true }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),

    // Resolve source maps to the original source
    sourceMaps(),
    terser({
      include: [/^.+\.min\.js$/]
    })
  ],
}
