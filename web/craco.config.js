const {addAfterLoader, loaderByName} = require('@craco/craco')

module.exports = {
  webpack: {
    configure(webpackConfig) {
      addAfterLoader(webpackConfig, loaderByName('babel-loader'), {
        test: /\.mdx?$/,
        loader: require.resolve('@mdx-js/loader')
      })

      webpackConfig.experiments = {
        topLevelAwait: true
      }

      return webpackConfig
    }
  }
}
