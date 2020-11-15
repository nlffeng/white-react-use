import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import camelCase from 'lodash.camelcase'
import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'
import { terser } from 'rollup-plugin-terser'
import serve from 'rollup-plugin-serve'
import injectProcessEnv from 'rollup-plugin-inject-process-env'
import livereload from 'rollup-plugin-livereload'

const libraryName = 'white-react-use'
const cameCaseName = camelCase(libraryName)

export default {
  input: 'examples/index.tsx',
  output: {
    file: `public/${cameCaseName}.js`,
    format: 'umd',
    name: cameCaseName,
    sourcemap: true,
  },
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  // external: [
  //   'react'
  // ],
  // watch: {
  //   include: 'src/**',
  // },
  plugins: [
    // Allow json resolution
    json(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),
    // Compile TypeScript files
    typescript({
      useTsconfigDeclarationDir: true,
      tsconfigOverride: {
        include: [
          "src",
          "examples"
        ]
      }
    }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs({
      namedExports: { 'node_modules/_react@16.14.0@react/index.js': ['useState', 'useCallback', 'useMemo', 'useEffect', 'useRef'] },
    }),
    injectProcessEnv({
      NODE_ENV: 'development',
    }),
    // Resolve source maps to the original source
    sourceMaps(),
    terser({
      include: [/^.+\.min\.js$/]
    }),
    livereload(),
    serve({
      contentBase: ['examples', 'public']
    }),
  ],
}
