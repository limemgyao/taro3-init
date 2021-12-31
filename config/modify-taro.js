const ConcatSource = require('webpack-sources').ConcatSource

// eslint-disable-next-line import/no-commonjs
//const fs = require('fs');
// eslint-disable-next-line import/no-commonjs
//const path = require('path');

export default ctx => {
  ctx.modifyBuildAssets(build => {
    // BA首页workaround
    const taroJs = build.assets['taro.js']
    if (taroJs) {
      const source = taroJs.source()
      let newSource
      if (process.env.NODE_ENV === 'production') {
        newSource = source.replace(
          /(\.eventSplitter=\/\\s\+\/;)/,
          '$1_wrapNativeSuper(Array);'
        )
        newSource = newSource.replace(
          /(throw new Error\(\"Unable to resolve global \`this\`\"\))/,
          'if(global)return global;$1'
        )
      } else {
        newSource = source.replace(
          'var RefsArray',
          '_wrapNativeSuper(Array);\nvar RefsArray'
        )
      }

      build.assets['taro.js'] = new ConcatSource(newSource)
    }
  })

  // console.log('options:', options)
  /*ctx.onBuildStart(() => {
  })

  ctx.onBuildFinish(() => {
    const options = [{
      fileDistPath: 'pages-echart/ec-canvas/ec-canvas.js', // 目标文件
      prependContent: 'require("../common");' // 在文件最前面添加的代码
    }]
    const optionsData = Array.isArray(options) ? options : [options];
    for (let i in optionsData) {
      const unitData = optionsData[i];
      const target = path.join(ctx.paths.outputPath, unitData.fileDistPath);
      const data = fs.readFileSync(target, 'utf8');
      fs.writeFileSync(target, `${unitData.prependContent};${data}`)
    }
  })*/
}
