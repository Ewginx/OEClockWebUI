const path = require('path');
const { merge } = require("webpack-merge");
const common = require("./webpack.config.js");


module.exports = merge(common, {
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist-dev')
    },
    historyApiFallback: true,
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
