var path = require("path");
var KintoClient = require("kinto-client").default;
var express = require("express");
var webpack = require("webpack");

var env = "dev", port = 8080;

var webpackConfig = require("./webpack.config." + env);
var compiler = webpack(webpackConfig);
var app = express();

app.use(require("webpack-dev-middleware")(compiler, {
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}));

app.use(require("webpack-hot-middleware")(compiler));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "formbuilder", "index.html"));
});

app.get("/react-jsonschema-form.css", function(req, res) {
  res.sendFile(path.join(__dirname, "css", "react-jsonschema-form.css"));
});

var url = process.env.SERVER_URL || "http://localhost:8888/v1/"; // I would like to get this from config, but been unable so far.
new KintoClient(url); // This will simply check the URL format over Kinto Standards

app.listen(port, "localhost", function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log("Listening at http://localhost:" + port);
});
