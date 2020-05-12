/* @flow */ 
const path = require('path');
const webpack = require('webpack');
const webpackNodeExternals = require('webpack-node-externals');

const testScript = /\.(js|jsx)$/;
const testStyle = /\.(css|scss|sass)$/;

const getPlugins = () => {
    const plugins = [
        new webpack.LoaderOptionsPlugin({
            options: {
                debug: true,
                minimize: false
            }
        })
    ].filter(Boolean);

    return plugins;
}

const config = {
    mode: 'development', // "production" | "development" | "none",
    entry: './src/client.js',
    output: {
        filename: 'client_main.js',
        path: path.resolve(__dirname, 'build/public'),
        publicPath: '/build/public'
    },
    devServer: {
        contentBase: './build/public',
        hot: true,
    },
    module: {
        rules: [
            {
                test: testScript,
                exclude: '/node_modules/',
                use: {
                    loader: "babel-loader"
                }
            }, {
                test: testStyle,
                use: [{
                        loader: 'style-loader'
                    }, {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            sourceMap: true,
                            modules: {
                                context: path.join(process.cwd(), './src'),
                                localIdentName: '[name]__[local]--[hash:base64:5]'
                            }
                        }
                    }, {
                        loader: 'postcss-loader', options: { sourceMap: true }
                    }, {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    },
    plugins: getPlugins(),
    resolve: {
        modules: ['src', 'node_modules'],
        descriptionFiles: ['package.json'],
        extensions: ['.js', '.jsx', '.json']
    }
};

const clientConfig = {
    ...config,
  
    name: 'client',
    target: 'web'
};

const serverConfig = {
    ...config,
  
    name: 'server',
    target: 'node',
    entry: './server.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/build'
    },
    devServer: {
        contentBase: './build',
        hot: true,
    },
    module: {
        rules: [
            {
                test: testScript,
                exclude: '/node_modules/',
                use: {
                    loader: "babel-loader"
                }
            }, {
                test: testStyle,
                use: ['isomorphic-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            sourceMap: true,
                            modules: {
                                context: path.join(process.cwd(), './src'),
                                localIdentName: '[name]__[local]--[hash:base64:5]'
                            }
                        }
                    }, {
                        loader: 'postcss-loader', options: { sourceMap: true }
                    }, {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    },
    externals: [webpackNodeExternals()]
};

module.exports = [clientConfig, serverConfig];
