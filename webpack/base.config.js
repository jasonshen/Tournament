const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill', './index.js'],

    context: path.join(__dirname, '../src/'),

    output: {
        path: path.join(__dirname, '../build'),
       filename: 'app.js'
    },

    mode: 'development',

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                  presets: ['react']
                }
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin()
    ]
};
