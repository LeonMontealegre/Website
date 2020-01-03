const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

function baseUrl(subdir) {
    return path.join(__dirname, ".", subdir);
}

const config = {
    entry: './site/public/js/index.ts',
    output: {
        filename: 'Bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    plugins: [
        new CopyWebpackPlugin([
            {from: 'site/public/index.html',      to: 'index.html'},
            {from: 'site/public/img/Walkway.ttf', to: 'Walkway.ttf'}
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
        alias: {
            "Vector": baseUrl('site/public/js/utils/math/Vector'),
            "math": baseUrl('site/public/js/utils/math'),
            "utils": baseUrl('site/public/js/utils')
        },
        extensions: ['.ts', '.js']
    }
};

module.exports = config;
