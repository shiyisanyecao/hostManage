const path = require('path');
// const merge = require('webpack-merge')
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
// const webpack = require('webpack')
// const common = require('./webpack.common.js')

module.exports = {
    entry: path.resolve(__dirname,'../src/app.js'),
    output: {
        path: path.resolve(__dirname,'../../resources/static'),
        filename: "index.js"
    },
    module: {
        rules: [
            { test: /\.vue$/,exclude:/node_modules/,loader:'vue-loader' },
            { test:/\.less$/,exclude:/node_modules/,loader:'css-loader!style-loader!postcss-loader!less-loader' },
            { test:/\.css$/,loader:'css-loader!style-loader!postcss-loader' },
            { test:/\.(png|gif|jpg|jpeg|bmp)$/,loader:'url-loader' },
            { test:/\.(png|woff|woff2|svg|ttf|eot)($|\?)/,loader:'url-loader?limit=10000' }
        ]
    }
}

// module.exports = merge(common, {
//     // devtool: 'source-map',
//     plugins: [
//         // new UglifyJSPlugin({
//         //     sourceMap: true
//         // }),
//         // new webpack.DefinePlugin({
//         //     'process.env.NODE_ENV': JSON.stringify('production')
//         // })
//     ]
// })