const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.config.js");


module.exports = (env) => {
  return merge(common(env), {
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

  ],
  devServer: {
    historyApiFallback: true,
    open: true,
  },
  devtool: "inline-source-map",
  mode: "development",
});
};
