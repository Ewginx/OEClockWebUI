const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    main: path.resolve(__dirname, "./src/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "main.js",
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
      filename: "index.html",
      // inject: false,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "assets/webfonts"),
          to: path.resolve(__dirname, "dist/webfonts"),
        },
        {
          from: path.resolve(__dirname, "assets/webfonts"),
          to: path.resolve(__dirname, "dist-dev/webfonts"),
        },
      ],
    }),
  ],
  optimization: {
    realContentHash: false,
  },
};
