const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.hmr.js");
const HTMLInlineCSSWebpackPlugin =
  require("html-inline-css-webpack-plugin").default;

module.exports = merge(common, {
  plugins: [
    new HTMLInlineCSSWebpackPlugin(),
  ],
});
