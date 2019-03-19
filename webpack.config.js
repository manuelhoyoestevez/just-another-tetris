const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, "src", "index.js"),
  output: {
    "path": path.resolve(__dirname),
    "filename": "app.bundle.js",
    "libraryTarget": "umd"
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"]
        }
      }
    ]
  }
};