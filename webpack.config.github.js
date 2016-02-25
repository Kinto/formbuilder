var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

const serverURL = process.env.SERVER_URL || "https://kinto-forms.herokuapp.com/v1/";

module.exports = {
  devtool: "eval",
  entry: "./formbuilder/app",
  output: {
    path: path.join(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "/static/"
  },
  plugins: [
    new ExtractTextPlugin("styles.css", {allChunks: true}),
    new webpack.DefinePlugin({
      "process.env": {
        SERVER_URL: JSON.stringify(serverURL)
      }
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
