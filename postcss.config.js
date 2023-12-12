module.exports = {
  plugins: {
    'postcss-cssnext': {
      warnForDuplicates: true
    },
    'postcss-pxtorem': {
      propList: ['*'],
      minPixelValue: 5
    },
    'cssnano': {
      discardComments: {
        removeAll: true
      }
    }
  }
}
