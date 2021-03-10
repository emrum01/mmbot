const path = require("path");
const GasPlugin = require("gas-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: false,
  context: __dirname,
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "main.js",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
            {
                test: /\.[tj]s$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            }
        ]
    },
    plugins: [new GasPlugin()],
};