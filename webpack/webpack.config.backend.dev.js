const fs = require('fs');
const resolve = require('path').resolve;
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const WebpackErrorNotificationPlugin = require('webpack-error-notification');
const BellOnBundlerErrorPlugin = require('bell-on-bundler-error-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const vendorStyles = require("./vendor.style").default;

const entry = {
    index: [
        "babel-polyfill",
        resolve(__dirname, '../server', 'index.ts'),
    ]
};

fs.readdirSync(resolve(__dirname, "..", "styles")).forEach(file => {
    if (/scss$/i.test(file)) {
        const name = file.replace(/\.scss$/i, '');
        entry[name] = resolve(__dirname, '../styles', name + '.scss');
    }
});

entry['base'] = [entry['base'], ...vendorStyles];

module.exports = {
    devtool: 'sourcemap',
    target: 'node',
    watch: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    entry: entry,
    output: {
        path: resolve(__dirname, '../dist/server'),
        filename: '[name].js',
        publicPath: '/',
        chunkFilename: '[name]-[id].js',
        libraryTarget: 'commonjs2'
    },
    externals: [nodeExternals()],
    context: resolve(__dirname, '../'),
    resolve: {
        modules: ['node_modules'],
        extensions: [".ts", ".tsx", ".js", '.scss', '.css'],
        descriptionFiles: ['package.json'],
        moduleExtensions: ['-loader'],
        alias: {
            "_actions": resolve(__dirname, '..', 'store/actions/index.ts'),
            "_blocks": resolve(__dirname, '..', 'view/block'),
            "_config": resolve(__dirname, '..', 'server/config.ts'),
            '_components': resolve(__dirname, '..', 'view/components'),
            '_containers': resolve(__dirname, '..', 'view/containers'),
            "_reducers": resolve(__dirname, '..', 'store/reducers/index.ts'),
            "_reducer": resolve(__dirname, '..', 'store/reducers'),
            "_route": resolve(__dirname, '..', 'route/index.tsx'),
            "_store": resolve(__dirname, '..', 'store/index.ts'),
            "_static": resolve(__dirname, '..', 'static'),
            "_images": resolve(__dirname, '..', 'static/images'),
            "_stylesLoad": resolve(__dirname, '..', 'styles'),
            "_style": resolve(__dirname, '..', 'styles/index.ts'),
            "_server": resolve(__dirname, '..', 'server'),
            "_utils": resolve(__dirname, '..', 'utils')
        }
    },
    node: {
        console: false,
        global: true,
        process: true,
        Buffer: true,
        __filename: true,
        __dirname: true,
        setImmediate: true
    },
    plugins: [
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
            'process.env.BROWSER': JSON.stringify(false),
            'process.env.ASSETS': JSON.stringify({})
        }),
        new webpack.NamedModulesPlugin(),
        new WebpackErrorNotificationPlugin(),
        new BellOnBundlerErrorPlugin(),
        new ExtractTextPlugin("../public/style/[name].css"),
        new SpriteLoaderPlugin(),
    ],
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
                include: resolve('./styles'),
                use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: [
                            {
                                loader: "css-loader", options: {
                                sourceMap: true,
                                modules: true,
                                importLoaders: 3,
                                localIdentName: '[local]---[hash:base64]',
                                discardComments: {
                                    removeAll: true
                                }
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
                                outputStyle: 'expanded',
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
                            extract: true,
                            spriteFilename: '../public/sprite.svg'
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
                            publicPath: function (url) {
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
                exclude: '/node_modules/'
            },
            {
                enforce: 'pre',
                test: /\.tsx?$/,
                use: "source-map-loader",
                exclude: '/node_modules/'
            },
            {
                test: /\.ts(x?)$/,
                use: [
                    {loader: 'awesome-typescript-loader'}
                ],
                exclude: /node_modules/,
                include: [
                    resolve(__dirname, '..', 'server'),
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