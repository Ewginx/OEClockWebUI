const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.config.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLInlineCSSWebpackPlugin =
  require("html-inline-css-webpack-plugin").default;

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
      __URL: '"ws://localhost:8000/ws"',
      __SETTINGS_JSON: "JSON.parse(await response.json())",
    }),
    new MiniCssExtractPlugin({
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
      filename: "index.html",
      // inject: false,
    }),
    new HTMLInlineCSSWebpackPlugin(),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist_dev"),
    },
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
