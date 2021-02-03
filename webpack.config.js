const path = require('path');
const webpack = require('webpack');

// Generates .html file with included .css and .js bundles
const HtmlWebpackPlugin = require('html-webpack-plugin');
// Styles in separate .css file
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// Cleans output directory every build
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/react"]
                    }
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    { // use style-loader for development (styles in <style> tag)
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // hmr: true,
                            // reloadAll: true,
                            publicPath: path.resolve(__dirname, './dist')
                        },
                    },
                    // 'style-loader',
                    'css-loader',
                    'resolve-url-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('node-sass')
                        },
                    }
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader',
                ],
            },
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        publicPath: path.resolve(__dirname, '/'),
        port: 3000,
        hot: true,
        // host: '0.0.0.0',
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "index.html"
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].bundle.css'
        }),
    ]
};

