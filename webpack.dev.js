const path = require('path');
const { merge } = require("webpack-merge");
const common = require("./webpack.config.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');

module.exports = merge(common, {
  entry: {
    main: path.resolve(__dirname, "./src/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "./dist_dev"),
    filename: "[name].js",
    clean: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      "__URL": JSON.stringify("localhost:8000"),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
      filename: "index.html",
      // inject: false,
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist_dev')
    },
    // historyApiFallback: true,
    open: true,
  },
  devtool: 'inline-source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
        generator: {
          filename: "[name][ext]",
        },
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
        generator: {
          filename: "[name][ext]",
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot)$/,
        type: "asset/source",
        generator: {
          filename: "./webfonts/[name][ext]",
        },
      },
      {
        test: /\.css$/i,
        // use: ["style-loader", "css-loader"],
        generator: {
          filename: "[name][ext]",
        },
      },

    ],
  },
}
);
