const path = require('path');
// https://github.com/webpack-contrib/copy-webpack-plugin
const CopyWebpackPlugin = require('copy-webpack-plugin');

// copies html files under `src/pages` over to `dist/pages`
const copyPluginPattern = {
    from: "./src/pages",
    test:  /\.html$/,
    to: "./pages",
    ignore: [ '*.js', '*.ts' ]
};

module.exports = {
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: {
                    loader: "html-loader?exportAsEs6Default",
                }
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'index.js',
        library: "boxrecMocks",
        libraryTarget: "commonjs2",
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CopyWebpackPlugin([copyPluginPattern]),
    ],
    target: "node"
};
