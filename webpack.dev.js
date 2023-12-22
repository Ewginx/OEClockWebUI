const path = require('path');
const { merge } = require("webpack-merge");
const common = require("./webpack.config.js");


module.exports = merge(common, {
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    },
    // historyApiFallback: true,
    open: true,
  },
  devtool: 'inline-source-map',
  mode: 'development',
}
);
