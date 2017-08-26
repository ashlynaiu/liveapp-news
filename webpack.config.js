// Copyright 2017 Quip

var path = require("path");
var webpack = require("webpack");
var extract = require("extract-text-webpack-plugin");
var writeFile = require("write-file-webpack-plugin");

module.exports = {
    devtool: "source-map",
    entry: path.resolve(__dirname, "./src/root.jsx"),
    output: {
        path: path.resolve(__dirname, "./element/dist"),
        filename: "element.js",
        publicPath: "dist",
    },
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    plugins: [
                        require.resolve("babel-plugin-transform-class-properties"),
                    ],
                    presets: [
                        require.resolve("babel-preset-es2015"),
                        require.resolve("babel-preset-react"),
                    ],
                }
            },
            {
                test: /\.less$/,
                loader: extract.extract({
                    fallback: "style-loader",
                    use: "css-loader?modules&importLoaders=1" +
                        "!postcss-loader" +
                        "!less-loader",
                })
            },
        ],
    },
    plugins: [
        new extract("element.css"),
        new writeFile(),
    ],
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
    },
    devServer: {
        contentBase: path.resolve(__dirname, "element/dist"),
        host: "localhost",
        port: 8888,
        inline: false,
    },
};
