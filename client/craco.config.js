const path = require('path')
module.exports = {
  webpack: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
    externals: {
      '@wangeditor/editor-for-react': '@wangeditor/editor-for-react',
      'react-quill': 'react-quill',
    },
    babel: {
      plugins: [
        // lodash按需加载
        "lodash",
      ],
      loaderOptions: {
        // babel-loader开启缓存
        cacheDirectory: true,
      },
    },
  },
}
