var webpack = require('webpack');

module.exports = [
    {
        entry: './index.js',
        output: {
            path: './dist',
            filename: 'chinesegen.js'
        },
        plugins: [new webpack.IgnorePlugin(/debug/)]
    },
    {
        entry: './index.js',
        output: {
            path: './dist',
            filename: 'chinesegen-min.js'
        },
        plugins: [
            new webpack.IgnorePlugin(/debug/),
            new webpack.optimize.UglifyJsPlugin({ output: { ascii_only: true }, minimize: true })
        ]
    }
];