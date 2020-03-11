const HtmlWebpackPlugin = require('html-webpack-plugin') //installed via npm
const webpack = require('webpack') //to access built-in plugins
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = {
    entry: './src/index.jsx',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'app', 'index.html')
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'app.css',
            chunkFilename: '[id].css'
        })
    ],
    module: {
        rules: [{
                test: /\.(js|jsx|tsx|ts)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react',
                            '@babel/preset-typescript'
                        ],
                        plugins: [
                            '@babel/plugin-transform-runtime',
                            'babel-plugin-styled-components',
                            '@babel/plugin-proposal-class-properties',
                            '@babel/plugin-proposal-object-rest-spread'
                        ]
                    }
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: /node_modules/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: true
                        }
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    esModule: true
                }
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg|png|jpe?g|gif)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]?[contenthash]',
                        limit: 8192
                    }
                }]
            }
        ]
    }
}

if (process.env.NODE_ENV === 'development') {;
    (config.watch = true), (config.devtool = 'source-map')
}

module.exports = (env, argv) => {
    if (argv.mode === 'development') {;
        (config.watch = true), (config.devtool = 'source-map')
    }

    if (argv.mode === 'production') {
        config.mode = argv.mode
        config.watch = false
    }

    return config
}