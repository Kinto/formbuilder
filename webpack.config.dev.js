var path = require("path");
var webpack = require("webpack");

const serverURL = process.env.SERVER_URL || "http://localhost:8888/v1/";

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
      },
      {
        test: /\.less$/,
        loader: "style!css!less"
      },
      {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"},
      {test: /\.jpg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/jpeg"}
    ]
  }
};
