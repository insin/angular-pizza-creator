const path = require('path')

module.exports = {
  type: 'react-app',
  polyfill: false,
  babel: {
    plugins: ['react-html-attrs']
  },
  webpack: {
    aliases: {
      assets: path.resolve('src/assets')
    },
    extra: {
      node: {
        process: false
      }
    }
  }
}
