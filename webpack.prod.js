const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.config.js");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlInlineScriptPlugin = require("html-inline-script-webpack-plugin");
const HTMLInlineCSSWebpackPlugin =
  require("html-inline-css-webpack-plugin").default;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");

module.exports = merge(common, {
  plugins: [
    new webpack.DefinePlugin({
      __URL: "`ws://${window.location.hostname}/ws`",
      __HOST_URL: "''",
    }),
    new MiniCssExtractPlugin({}),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
      filename: "index.html",
      inject: "body",
      // inject: false,
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
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/inline",
      },
      {
        test: /\.(woff(2)?|ttf|eot)$/,
        use: ["base64-inline-loader"],
        type: "javascript/auto",
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
          },
        ],
      },
    ],
  },
});
