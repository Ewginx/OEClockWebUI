const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.config.js");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require('webpack');

module.exports = merge(common, {
  plugins: [
    new webpack.DefinePlugin({
      "__URL": JSON.stringify("${window.location.hostname}"),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
      filename: "index.html",
      // inject: false,
    }),
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
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
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
        type: "asset/resource",
        generator: {
          filename: "[name].[contenthash:5][ext]",
        },
      },
      // {
      //   test: /\.(woff(2)?|ttf|eot)$/,
      //   type: "asset/source",
      //   generator: {
      //     filename: "[name].[contenthash][ext]",
      //   },
      // },
      {
        test: /\.css$/i,
        // use: ["style-loader", "css-loader"],
        generator: {
          filename: "[name].[contenthash:5][ext]",
        },
      },
    ],
  },
});
