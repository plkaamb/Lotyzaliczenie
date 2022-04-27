const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

   module.exports = {
      entry: {
         main: './src/index.js'
      },
      output: {
         path: path.resolve(__dirname, "dist"),
         filename: "[name].js",
         clean: true
         },
      devtool: "source-map",
      module: {
         rules: [{
            test: /\.scss$/,
            use: [
               "style-loader",
               "css-loader",
               "sass-loader"
            ]
         },
         {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader',
               options: {
                  presets: ['@babel/preset-env']
               }
            }
         },
         {
            test: /\.(png|svg|jpg|gif)$/,
            type: 'asset/resource',
      }]
   },
   plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
            template: "./src/index.html"
      })

   ]
}