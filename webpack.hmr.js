const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.config.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
      __WEBSOCKET_URL: '"ws://localhost:8000/ws"',
      __HOST_URL: '"http://localhost:8000"',
    }),
    new MiniCssExtractPlugin({}),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
      filename: "index.html",
      // inject: false,
    }),
  ],
  devServer: {
    historyApiFallback: true,
    open: true,
  },
  devtool: "inline-source-map",
  mode: "development",
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
