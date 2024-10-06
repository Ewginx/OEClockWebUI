const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const I18nPlugin = require("@zainulbr/i18n-webpack-plugin");

const languages = {
  en: null,
  ru: require("./locales/ru.json"),
};

const lang = 'en'

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
      inject: "body",
    }),
    new I18nPlugin(languages[lang]),
    new MiniCssExtractPlugin({}),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: "underscore-template-loader",
        options: {
          parseDynamicRoutes: true,
        },
      },
      {
        test: /\.(png|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        type: "asset/inline",
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
};
