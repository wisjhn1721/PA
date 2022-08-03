const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
    webpack: {
      configure: {
        output: {
          path: require("path").resolve(__dirname, "build"),
        },
      },
    },
    devServer: {
      hot: false,
      open: false
    },
  };