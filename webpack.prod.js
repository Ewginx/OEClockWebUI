const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.config.js");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
});
