var path = require("path");
var webpack = require("webpack");

const serverURL = process.env.SERVER_URL || "https://kinto.dev.mozaws.net/v1/" || "http://localhost:8888/v1/";

module.exports = {
  devtool: "eval",
  entry: [
    "webpack-hot-middleware/client?reload=true",
    "./formbuilder/app"
  ],
  output: {
    path: path.join(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "/static/"
  },
  plugins: [
    new webpack.IgnorePlugin(/^(buffertools)$/), // unwanted "deeper" dependency
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        SERVER_URL: JSON.stringify(serverURL)
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel",
        include: [
          path.join(__dirname, "src"),
          path.join(__dirname, "formbuilder"),
        ],
        query: {
          plugins: ["react-transform"],
          extra: {
            "react-transform": {
              transforms: [{
                transform: "react-transform-hmr",
                imports: ["react"],
                locals: ["module"]
              }]
            }
          }
        }
      },
      {
        test: /\.css$/,
        loader: "style!css",
        include: [
          path.join(__dirname, "css"),
          path.join(__dirname, "formbuilder"),
          path.join(__dirname, "node_modules"),
        ],
      }
    ]
  }
};
