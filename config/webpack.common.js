const path = require('path')
// const ClearWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: path.resolve(__dirname,'../src/app.js'),
    output: {
        path: path.resolve(__dirname,'../../resources/static'),
        filename: "index.js"
    },
}