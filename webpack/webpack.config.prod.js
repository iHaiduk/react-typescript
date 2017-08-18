const fs = require('fs');
const resolve = require('path').resolve;
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WebpackErrorNotificationPlugin = require('webpack-error-notification');
const BellOnBundlerErrorPlugin = require('bell-on-bundler-error-plugin');
const OfflinePlugin = require('offline-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const entry = {
    bundle: './client/index.tsx',
    vendor: [
        'react',
        'react-dom',
        'react-helmet',
        "react-redux",
        'react-hot-loader',
        'react-router',
        'react-router-dom',
        'react-router-redux',

        'redux',
        "redux-thunk",
        "redux-promise-middleware",

        "history",
        'immutable',
        'classnames',
        "socket.io-client"
    ],
    style: [
        './styles/index.ts',
    ],
};

const excludes_offline = ['style/style.css*', 'style.css*'];

fs.readdirSync(resolve(__dirname, "..", "styles")).forEach(file => {
    if(/scss$/i.test(file)) {
        const name = file.replace(/\.scss$/i, '');
        entry[name] = resolve(__dirname, '../styles', name + '.scss');
        // entry.style.push('./styles/' + name + '.tsx');
        excludes_offline.push(name + ".js*")
    }
});

console.log(excludes_offline)

module.exports = {
    // To enhance the debugging process. More info: https://webpack.js.org/configuration/devtool/
    devtool: false,
    target: 'web',
    entry: entry,
    output: {
        path: resolve(__dirname, '../dist/public'),
        // necessary for HMR to know where to load the hot update chunks
        publicPath: '/',
        libraryTarget: 'umd',
        filename: '[name].js?[hash]', // string
        // the filename template for entry chunks
        sourceMapFilename: '[name].js.map?[hash]',
        chunkFilename: '[name].[hash:4].js',
        // libraryTarget: 'umd'
        jsonpFunction: '$'
    },

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
            "_route": resolve(__dirname, '..', 'route/index.tsx'),
            "_store": resolve(__dirname, '..', 'store/index.ts'),
            "_stylesLoad": resolve(__dirname, '..', 'styles'),
            "_style": resolve(__dirname, '..', 'styles/index.ts')
        }
    },
    plugins: [
        new CleanWebpackPlugin(['./dist/public/'], {
            root: resolve(__dirname, '..'),
            verbose: true,
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
            root: resolve(__dirname, '..')
        }),
        new webpack.DefinePlugin({
            'process.env': {
                BROWSER: JSON.stringify(true),
                NODE_ENV: JSON.stringify('production'),
                WEB: JSON.stringify('production')
            }
        }),

        // do not emit compiled assets that include errors
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),

        // new webpack.optimize.UglifyJsPlugin(),

        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            beautify: false,
            sourcemap: false,
            comments: false,
            mangle: {
                except: [
                    '$', 'webpackJsonp'
                ],
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true,
                drop_console: true
            },
            output: {
                comments: false,
                screw_ie8: true
            }
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity,
            filename: 'vendor.js?[hash]'
        }),
        new WebpackErrorNotificationPlugin(),
        new BellOnBundlerErrorPlugin(),
        new ExtractTextPlugin("style/[name].css?[hash]"),
        new OfflinePlugin({
            excludes: excludes_offline,
            responseStrategy: 'network-first',
            ServiceWorker: {
                minify: true
            }
        }),
        new ManifestPlugin({
            fileName: "../server/manifest.json"
        })
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use:
                    ExtractTextPlugin.extract({
                        fallback: "style-loader?sourceMap=false",
                        use: [
                            {
                                loader: "css-loader", options: {
                                sourceMap: false,
                                modules: true,
                                importLoaders: 1,
                                minimize: true,
                                localIdentName: '[hash:base64:6]'
                            }
                            },
                            'group-css-media-queries-loader',
                            {
                                loader: "sass-loader", options: {
                                sourceMap: false,
                                // indentedSyntax: true,
                                modules: true,
                            }
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: (loader) => [
                                        require('autoprefixer')({
                                            browsers: [
                                                'last 2 versions',
                                                '> 1%',
                                                'android 4',
                                                'iOS 9',
                                            ],
                                            cascade: false
                                        }),
                                        require('cssnano')({
                                            preset: 'advanced',
                                        })
                                    ]
                                }
                            }
                        ]
                    })

            },
            // Once TypeScript is configured to output source maps we need to tell webpack
            // to extract these source maps and pass them to the browser,
            // this way we will get the source file exactly as we see it in our code editor.
            // {
            //     enforce: 'pre',
            //     test: /\.js$/,
            //     loader: 'source-map-loader',
            //     exclude: '/node_modules/'
            // },
            // {
            //     enforce: 'pre',
            //     test: /\.tsx?$/,
            //     use: "source-map-loader",
            //     exclude: '/node_modules/'
            // },
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            {
                test: /\.ts(x?)$/,
                use: [
                    // {
                    //     loader: 'babel-loader',
                    //     query: {
                    //         presets: ["react-optimize", "stage-0"],
                    //         plugins: ['transform-react-remove-prop-types']
                    //     }
                    // },
                    // {
                    //     loader: 'string-replace-loader',
                    //     options: {
                    //         search: '_import',
                    //         replace: 'import',
                    //         flags: 'ig'
                    //     }
                    // },
                    {loader: 'awesome-typescript-loader'}
                ],
                exclude: /node_modules/,
                include: [
                    resolve(__dirname, '..', 'client'),
                    resolve(__dirname, '..', 'route'),
                    resolve(__dirname, '..', 'store'),
                    resolve(__dirname, '..', 'styles'),
                    resolve(__dirname, '..', 'view')
                ],
            }
        ]
    }
};