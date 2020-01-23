const webpack = require('webpack');
const path = require("path");
const mainPath = './src';
const Dotenv = require('dotenv-webpack');

module.exports = env => {

    return {
        entry: [
           // 'babel-polyfill',
            path.resolve(__dirname, "src/index.js")
        ],
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "main.js"
        },
        resolve: {
            alias: {
                'Constants' : path.resolve(__dirname, mainPath + '/Constants'),
                'Components' : path.resolve(__dirname, mainPath + '/Components'),
                'Store' : path.resolve(__dirname, mainPath + '/Store'),
                'Views' : path.resolve(__dirname, mainPath + '/Views'),
                'Assets' : path.resolve(__dirname, mainPath + '/Assets'),
                'Helpers' : path.resolve(__dirname, mainPath + '/Helpers'),
                'Services' : path.resolve(__dirname, mainPath + '/Services'),
                '@' : path.resolve(__dirname, mainPath),
            },
            extensions: [".js", ".jsx"]
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /noe_modules/,
                    use: ["babel-loader"]
                },
                {
                    test:/\.css$/,
                    use:['style-loader','css-loader']
                },
                {
                    test: /\.(eot|svg|ttf|woff|woff2)$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: '/css/fonts/',
                            publicPath: '/css/fonts/'
                        }}]
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        }}]
                }
            ]
        },
        plugins: [
            new Dotenv({
                path: '.env.' + env.NODE_ENV,
                defaults: '.env.dist',
                systemvars: true
            }),
            new webpack.DefinePlugin({
                ENV: JSON.stringify(env)
            }),
        ],
        node: {
            fs: "empty"
        },
        devServer: {
            contentBase: path.resolve(__dirname, "dist"),
            publicPath: '/',
            historyApiFallback: true,
            port: 9009
        }
    };
};