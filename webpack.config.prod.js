var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

const serverURL = process.env.SERVER_URL || "https://kinto.notmyidea.org/v1/";
const appURL = process.env.APP_URL || "https://www.fourmilieres.net/";


module.exports = {
  entry: ["./formbuilder/app", "babel-polyfill"],
  output: {
    path: path.join(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "/static/"
  },
  plugins: [
    new webpack.IgnorePlugin(/^(buffertools)$/), // unwanted "deeper" dependency
    new ExtractTextPlugin("styles.css", {allChunks: true}),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
        SERVER_URL: JSON.stringify(serverURL),
        APP_URL: JSON.stringify(appURL),
      },
    })
  ],
  resolve: {
    extensions: ["", ".js", ".jsx", ".css"]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel",
        include: [
          path.join(__dirname, "src"),
          path.join(__dirname, "formbuilder"),
        ],
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("css-loader"),
        include: [
          path.join(__dirname, "css"),
          path.join(__dirname, "formbuilder"),
          path.join(__dirname, "node_modules"),
        ],
      }
    ]
  }
};
