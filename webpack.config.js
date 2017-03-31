var webpack = require('webpack');

module.exports = {
    entry: './src/app.js',
    output: {
        filename: './bin/cococore.js'
    },
    // plugins: [new webpack.optimize.UglifyJsPlugin({
    //     compress: {
    //         warnings: false
    //     }
    // })]
};
