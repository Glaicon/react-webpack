const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

const config = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [ 
      new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src', 'app', 'index.html') }),
  ],
  module: {
    rules:[
            {
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
                            '@babel/plugin-proposal-object-rest-spread',
                        ],
                    },
                },           
            },
            {
                test: /\.css$/,
                use: [
                // style-loader
                { loader: 'style-loader' },
                // css-loader
                {
                    loader: 'css-loader',
                    options: {
                    modules: true
                    }
                },
                // sass-loader
                { loader: 'sass-loader' }
                ]
            },
             {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                esModule: true,
                },
            },
        ]
    }
};

if(process.env.NODE_ENV === 'development') {
  config.watch =  true,
  config.devtool = 'source-map'
}

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
        config.watch =  true,
        config.devtool = 'source-map'
  }

  if (argv.mode === 'production') {
    //...
  }

  return config;
}
