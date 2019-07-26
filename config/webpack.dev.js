const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: path.resolve(__dirname,'../src/app.js'),
    output: {
        path: path.resolve(__dirname,'../../resources/static'),
        filename: "index.js"
    },
    resolve: {
        extensions: ['.js','.vue'],
        alias: {
            'src': path.resolve(__dirname, '../src'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'components': path.resolve(__dirname, '../src/components'),
            vue: 'vue/dist/vue.js'
        }
    },
    module: {
        rules: [
            { test: /\.vue$/,exclude:/node_modules/,loader:'vue-loader' },
            { test:/\.less$/,exclude:/node_modules/,loader:'css-loader!style-loader!postcss-loader!less-loader' },
            { test:/\.css$/,loader:'css-loader!style-loader!postcss-loader' },
            { test:/\.(png|gif|jpg|jpeg|bmp)$/,loader:'url-loader' },
            { test:/\.(png|woff|woff2|svg|ttf|eot)($|\?)/,loader:'url-loader?limit=10000' }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        require('autoprefixer'),
        new HtmlWebpackPlugin({
            template: '../static/index.html',
            filename: 'index.html',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin({
            url: 'http://localhost:8001'
        }),
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse((process.env.development == 'development') || 'false'))
        })
    ],
    devServer: {
        // colors: true,
        historyApiFallback: true,
        contentBase:'./build/',
        inline: true,
        hot: true,
        port: '8001'
    }
};