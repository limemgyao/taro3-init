// eslint-disable-next-line import/no-commonjs
const path = require('path')
const pkg = require(path.resolve(__dirname, '../package.json'))
const { publicPath, bucket: CDNBucket, path: CDNPath } = pkg.cdn || {}
const PUBLIC_PATH = `${publicPath}${CDNPath}`

module.exports = {
  env: {
    NODE_ENV: '"production"'
  },
  defineConstants: {
  },
  mini: {},
  weapp: {},
  h5: process.env.RELEASE === 'h5'
    ? {
      output: {
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].[chunkhash:8].js'
      },
      miniCssExtractPluginOption: {
        filename: 'css/[name].[hash:8].css',
        chunkFilename: 'css/[id].[hash:8].css'
      },
      webpackChain (chain) {
        chain.output
          .publicPath( PUBLIC_PATH )

        chain.merge({
          resolve: {
            alias: {
              'react$': 'nervjs',
              'react-dom$': 'nervjs'
            }
          },
          plugin: {
            'qn-webpack': {
              plugin: require('qn-webpack'),
              args: [{
                accessKey: process.env.CDN_ACCESS_KEY,
                secretKey: process.env.CDN_SECRET_KEY,
                bucket: CDNBucket,
                path: CDNPath,
                exclude: /(?:manifest\.json|\.map)$/
              }]
            }
          }
        })
      }
    }
    : {}
}
