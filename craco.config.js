const path = require('path')
const CracoLessPlugin = require('craco-less')

const resolve = (pathname) => path.resolve(__dirname, pathname)

module.exports = {
  //less
  plugins: [
    {
      plugin: CracoLessPlugin
    }
  ],
  // webpack
  webpack: {
    reactScriptsVersion: 'react-scripts' /* (default value) */,
    alias: {
      '@': resolve('src'),
      components: resolve('src/components'),
      utils: resolve('src/utils')
    },
    mode: 'extends',
    configure: {
      module: {
        rules: [
          {
            test: /\.js$/,
            enforce: 'pre',
            use: ['source-map-loader']
          }
        ]
      },
      ignoreWarnings: [/Failed to parse source map/]
    }
  }
}
