import path from 'path'
import chalk from 'chalk'
import dotenvFlow from 'dotenv-flow'
import pkg from '../package.json'
import { resolveConst, resolveEnvs } from './utils'

const BUILD_ENV = process.env.BUILD_ENV
const TARO_ENV = process.env.TARO_ENV || 'weapp'
// 是否为生产模式
const isPro = process.env.NODE_ENV === 'production'

//https://www.cnblogs.com/Faith-Yin/p/15219706.html
//__dirname 可以用来动态获取当前文件所属目录的绝对路径
//__filename 可以用来动态获取当前文件的绝对路径，包含当前文件

console.log(chalk.green(`mode: ${BUILD_ENV} `, `TARO_ENV: ${TARO_ENV}`))

console.log('__dirname----------',__dirname)

dotenvFlow.config({
  node_env: BUILD_ENV
})

const DIST_PATH = `dist/${TARO_ENV}`
const APP_ENVS = resolveEnvs()

const config = {
  projectName: pkg.name,
  date: '2021-12-8',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: DIST_PATH,// 用来设置代码编译后的生产目录，通过 Taro 开发工具初始化后的生产目录都是 dist，你可以通过修改这一配置来重新指定生产目录。
  plugins: [ // Taro 引入了插件化机制，允许开发者通过编写插件的方式来为 Taro 拓展更多功能或者为自身业务定制个性化功能
    //path.join(__dirname, './modify-taro.js'),
   "@tarojs/plugin-sass",
    //"@tarojs/plugin-uglify",
  ],
  //plugins: [],
  sass: {
    resource: path.resolve(__dirname, "..", "src/assets/style/imports.scss"),
    projectDirectory: path.resolve(__dirname, '..')
  },
  alias: { // taro中别名引入路径
    '@': path.join(__dirname, '../src')
  },
  uglify: {// 用来配置 UgligyJS 工具，设置打包过程中的 JS 代码压缩。可以通过 uglify.enable 来设置是否开启压缩，
    enable: isPro,
    config: {
      // 配置项同 https://github.com/mishoo/UglifyJS2#minify-options
      compress: {
        drop_console: isPro,
        drop_debugger: isPro
      }
    }
  },
  babel: { //???????????????????? 用来配置 babel，默认配置如下，可以自行添加自己需要的额外的 presets 及 plugins。
    sourceMap: true,
    presets: [['env', { modules: false }]],
    plugins: [
      'transform-decorators-legacy',
      'transform-class-properties',
      'transform-object-rest-spread',
      ['transform-runtime', {
        helpers: false,
        polyfill: false,
        regenerator: true,
        moduleName: 'babel-runtime'
      }]
    ]
  },
  defineConstants: resolveConst( // 用来配置一些全局变量供代码中进行使用，配置方式与 Webpack DefinePlugin 类似
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
    patterns: TARO_ENV === 'h5' ? [
      { from: 'src/assets', to: `${DIST_PATH}/assets` },
      //{ from: 'git_submodule/.git', to: `${DIST_PATH}/` }
    ] : [
      { from: 'src/assets', to: `${DIST_PATH}/assets` }
    ],
    // patterns: [{ from: 'src/assets', to: `${DIST_PATH}/assets` }],
    options: {}
  },
  framework: 'react',
  mini: {
    webpackChain (chain) {//, webpack
      chain.optimization.sideEffects(false)
      chain.merge({
        optimization: {
          splitChunks: {
            cacheGroups: {
              lodash: {
                name: 'lodash',
                priority: 1000,
                test (module) {
                  return /node_modules[\\/]lodash/.test(module.context)
                }
              },
              moment: {
                name: 'date-fns',
                priority: 1000,
                test (module) {
                  return /node_modules[\\/]date-fns/.test(module.context)
                }
              }
            }
          }
        }
      })
      // if (isPro) {
      //   chain.plugin('analyzer')
      //     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
      // }
      // chain
      //   .plugin('IgnorePlugin')
      //   .use(webpack.IgnorePlugin, [/^\.\/locale$/, /date-fns$/])
      // chain
      //   .plugin('LodashModuleReplacementPlugin')
      //   .use(require('lodash-webpack-plugin'), [
      //     {
      //       coercions: true,
      //       paths: true
      //     }
      //   ])
    },
    commonChunks (commonChunks) {
      commonChunks.push('lodash')
      commonChunks.push('date-fns')
      return commonChunks
    },
    // 图片转换base64
    imageUrlLoaderOption: {
      limit: 0
    },


    postcss: {
      autoprefixer: { //PostCSS 是一个使用 JS 插件转换样式的工具，里面有解析器，能够使用autoprefixer等插件，处理css。插件Autoprefixer在PostCSS中最流行。
        enable: true,
        config: {
          overrideBrowserslist: ['last 3 versions', 'Android >= 4.1', 'ios >= 8']
        }
      },
      pxtransform: {
        enable: true,
        config: {}
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
    router: {
      mode: "browser"
    },
    esnextModules: ["taro-ui"],
    /*webpackChain(chain, webpack) {
      chain.merge({
        resolve: {
          alias: {
            react$: "nervjs",
            "react-dom$": "nervjs"
          }
        }
      });
      chain.merge({
        optimization: {
          splitChunks: {
            cacheGroups: {
              lodash: {
                name: "lodash",
                priority: 1000,
                test(module) {
                  return /node_modules[\\/]lodash/.test(module.context);
                }
              },
              moment: {
                name: "date-fns",
                priority: 1000,
                test(module) {
                  return /node_modules[\\/]date-fns/.test(module.context);
                }
              }
            }
          }
        }
      });
      // if (!isPro) {
      //   chain.plugin('analyzer')
      //     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
      // }
      chain
        .plugin("IgnorePlugin")
        .use(webpack.IgnorePlugin, [/^\.\/locale$/, /date-fns$/]);
      /!*chain
        .plugin("LodashModuleReplacementPlugin")
        .use(require("lodash-webpack-plugin"), [
          {
            coercions: true,
            paths: true
          }
        ]);*!/
    },*/
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
          overrideBrowserslist: ['last 3 versions', 'Android >= 4.1', 'ios >= 8']
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
