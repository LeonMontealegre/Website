const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
    entry: './index.ts',
    output: {
        filename: 'Bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    plugins: [
        new CopyWebpackPlugin([
            {from: 'index.html',   to: 'index.html'},
            {from: 'Walkway.ttf',  to: 'Walkway.ttf'}
        ])
    ],
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(ts)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'ts-loader',
                    options: {onlyCompileBundledFiles: true}
                }
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    }
};

module.exports = config;
