const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './index.ts',
    devtool: 'source-map',
    devServer: {
        publicPath: '/dist/',
        overlay: true
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                options: {
                    usePrecompiledFiles: true
                }
            }
        ]
    },
    target: 'node',
    externals: [nodeExternals()],
    output : {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    }
}