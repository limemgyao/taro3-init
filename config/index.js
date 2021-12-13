//import path from 'path'
import chalk from 'chalk'
import dotenvFlow from 'dotenv-flow'
import pkg from '../package.json'
import { resolveConst, resolveEnvs } from './utils'

const BUILD_ENV = process.env.BUILD_ENV
const TARO_ENV = process.env.TARO_ENV

console.log(chalk.green(`mode: ${BUILD_ENV} `, `TARO_ENV: ${TARO_ENV}`))

dotenvFlow.config({
  node_env: BUILD_ENV
})

const DIST_PATH = `dist/${TARO_ENV}`
const APP_ENVS = resolveEnvs()

const config = {
  projectName: 'project',
  date: '2021-12-8',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [],
  defineConstants: resolveConst(
    {
      APP_NAME: `${pkg.app_name}`,
      APP_VERSION: `${pkg.version}`,
      APP_ENV: process.env.NODE_ENV,
      APP_BASENAME: '',
      ...APP_ENVS,
      APP_AUTH_PAGE:
        TARO_ENV === 'h5' ? APP_ENVS.APP_AUTH_PAGE : '/pages/auth/authorize'
    },
    TARO_ENV
  ),
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'react',
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {

        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
