const fs = require('fs');
const resolve = require('path').resolve;
const webpack = require('webpack');
const WebpackErrorNotificationPlugin = require('webpack-error-notification');
const BellOnBundlerErrorPlugin = require('bell-on-bundler-error-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const vendorStyles = require("./vendor.style").default;
const vendorScripts = require("./vendor.scripts").default;
const aliases = require("./webpack.frontend.aliases").default;

const entry = process.env.TEMP_NAME ? {bundle: process.env.TEMP_NAME} : {
    bundle: [
        // activate HMR for React
        'react-hot-loader/patch',
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint
        'webpack-dev-server/client?http://0.0.0.0:3000',
        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates
        'webpack/hot/only-dev-server',
        // Our app main entry
        './client/index.tsx'
    ],
    vendor: vendorScripts,
    style: './styles/index.ts',
};

const plugins = [
    new webpack.LoaderOptionsPlugin({
        debug: true,
        options: {
            public: true,
            progress: true,
            configuration: {
                devtool: 'sourcemap'
            }
        },
        root: resolve(__dirname, '..')
    }),
    new webpack.DefinePlugin({
        'process.env': {
            BROWSER: JSON.stringify(true),
            NODE_ENV: JSON.stringify('development')
        }
    }),

    new webpack.NamedModulesPlugin(),
    new WebpackErrorNotificationPlugin(),
    new ExtractTextPlugin("style/[name].css")
];

if(process.env.TEMP_NAME === undefined) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
    plugins.push(new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity,
        filename: 'vendor.js'
    }));
    plugins.push(new BellOnBundlerErrorPlugin());
    plugins.push(new SpriteLoaderPlugin());
}

fs.readdirSync(resolve(__dirname, "..", "styles")).forEach(file => {
    if(/scss$/i.test(file)) {
        const name = file.replace(/\.scss$/i, '');
        entry[name] = resolve(__dirname, '../styles', name + '.scss');
    }
});

entry['base'] = [entry['base'], ...vendorStyles];

module.exports = {
    devtool: 'sourcemap',
    target: 'web',
    entry: entry,
    output: {
        path: resolve(__dirname, process.env.TEMP_DIR || '../dist/public'),
        filename: '[name].js',
        publicPath: '/',
        chunkFilename: '[name]-[id].js',
        libraryTarget: 'umd'
    },

    devServer: {
        hot: true,
        proxy: {
            '*': 'http://0.0.0.0:' + (process.env.PORT || 1337),
            ws: true
        },

        publicPath: '/',
        host: "0.0.0.0",

        port: 3000,
        historyApiFallback: true,
        stats: {
            colors: true,
            chunks: false,
        },
        compress: true,
        disableHostCheck: true,
        headers: {'Access-Control-Allow-Origin': '*'},
        open: false
    },

    context: resolve(__dirname, '../'),
    resolve: {
        modules: ['node_modules'],
        extensions: [".ts", ".tsx", ".js", '.scss', '.css'],
        descriptionFiles: ['package.json'],
        moduleExtensions: ['-loader'],
        alias: aliases,
    },
    plugins: plugins,
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader", options: {
                            sourceMap: true,
                            modules: true,
                            localIdentName: '[local]'
                        }
                        }
                    ]
                })
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use:
                    ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: [
                            {
                                loader: "css-loader", options: {
                                sourceMap: true,
                                modules: true,
                                importLoaders: 3,
                                localIdentName: '[local]---[hash:base64]'
                            }
                            },
                            'group-css-media-queries-loader',
                            {
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: true,
                                    plugins: (loader) => [
                                        require('autoprefixer')({
                                            browsers: [
                                                'last 2 versions',
                                                '> 1%',
                                                'android 4',
                                                'iOS 9',
                                            ],
                                            cascade: false
                                        })
                                    ]
                                }
                            },
                            {
                                loader: "sass-loader", options: {
                                    sourceMap: true,
                                    // indentedSyntax: true,
                                    modules: true,
                                }
                            }
                        ]
                    })

            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-sprite-loader',
                        options: {
                            extract: false,
                            spriteFilename: 'sprite.svg'
                        }
                    }
                ],
                include: resolve('./static/icon')
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[sha512:hash:base64:7].[ext]',
                            publicPath: function(url) {
                                return url.replace('../public/images/', '/images/')
                            },
                            outputPath: '../public/images/'
                        }
                    }
                ],
                include: resolve('./static/images')
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
                exclude: /node_modules|styles/,
            },
            {
                enforce: 'pre',
                test: /\.tsx?$/,
                use: "source-map-loader",
                exclude: /node_modules|styles/,
            },
            {
                test: /\.ts(x?)$/,
                use: [
                    {loader: 'react-hot-loader/webpack'},
                    {loader: 'awesome-typescript-loader'}
                ],
                exclude: /node_modules/,
                include: [
                    resolve(__dirname, '..', 'client'),
                    resolve(__dirname, '..', 'utils'),
                    resolve(__dirname, '..', 'route'),
                    resolve(__dirname, '..', 'store'),
                    resolve(__dirname, '..', 'styles'),
                    resolve(__dirname, '..', 'view')
                ],
            }
        ]
    }
};