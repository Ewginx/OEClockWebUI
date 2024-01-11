const path = require("path");
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
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, "assets/webfonts"),
    //       to: path.resolve(__dirname, "dist/webfonts"),
    //     },
    //     {
    //       from: path.resolve(__dirname, "assets/webfonts"),
    //       to: path.resolve(__dirname, "dist_dev/webfonts"),
    //     },
    //   ],
    // }),
  ],
  // optimization: {
  //   realContentHash: false,
  // },
};
