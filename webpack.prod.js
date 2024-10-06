const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.config.js");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const HtmlInlineScriptPlugin = require("html-inline-script-webpack-plugin");
const HTMLInlineCSSWebpackPlugin =
  require("html-inline-css-webpack-plugin").default;
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (env) => {
  return merge(common(env), {
    plugins: [
      new webpack.DefinePlugin({
        __WEBSOCKET_URL: "`ws://${window.location.hostname}/ws`",
        __HOST_URL: "''",
      }),
      new HTMLInlineCSSWebpackPlugin(),
      new HtmlInlineScriptPlugin(),
      new CompressionPlugin({
        deleteOriginalAssets: true,
      }),
    ],
    entry: {
      main: path.resolve(__dirname, "./src/index.js"),
    },
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "[name].[contenthash:5].js",
      clean: true,
    },
    mode: "production",
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
      realContentHash: false,
    },
  });
};
