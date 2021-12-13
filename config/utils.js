module.exports = {
  resolveConst (defs, taroEnv) {
    if (taroEnv === 'h5') {
      defs = Object.keys(defs).reduce((val, k) => {
        val[k] = `'${defs[k]}'`
        return val
      }, {})
    }

    return defs
  },

  resolveEnvs () {
    const envs = Object.keys(process.env).reduce((ret, key) => {
      const val = process.env[key]
      if (key.indexOf('APP_') >= 0) {
        console.log(`${key}=${val}`)
        ret[key] = val
      }

      return ret
    }, {})

    return envs
  },

  addCrmPages (pages, pagesNames) {
    let overseaPages = [
      'index'
    ]
    overseaPages = overseaPages.map((item) => `pages-echart/crm/${item}`)
    overseaPages.forEach((item) => {
      pages.set(item, ['pages-echart/common'])
    })
  }
}
