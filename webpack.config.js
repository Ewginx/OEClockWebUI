const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/js/index.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
      // inject: false,
    }),
  ],
  optimization: {
    realContentHash: false,
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
        generator : {
          filename : '[name][ext]',
        }
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
        generator : {
          filename : '[name][ext]',
        }
      },
      {
        test: /\.css$/i,
        // use: ["style-loader", "css-loader"],
        generator : {
          filename : '[name][ext]',
        }
      },
    ],
  },
}
