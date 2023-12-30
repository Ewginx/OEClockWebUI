const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.config.js");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = merge(common, {
  plugins: [
    new CompressionPlugin({
      deleteOriginalAssets: true,
    }),
  ],
  entry: {
    main: path.resolve(__dirname, "./src/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].[contenthash].js",
    clean: true,
  },
  mode: "production",
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
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
          filename: "[name].[contenthash][ext]",
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot)$/,
        type: "asset/source",
        generator: {
          filename: "[name].[contenthash][ext]",
        },
      },
      {
        test: /\.css$/i,
        // use: ["style-loader", "css-loader"],
        generator: {
          filename: "[name].[contenthash][ext]",
        },
      },
    ],
  },
});
