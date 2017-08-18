const fs = require('fs');
const resolve = require('path').resolve;
const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');
const WebpackErrorNotificationPlugin = require('webpack-error-notification');
const BellOnBundlerErrorPlugin = require('bell-on-bundler-error-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OfflinePlugin = require('offline-plugin');

const entry = {
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
        './styles/block.tsx',
        './styles/section.tsx',
    ],
};

fs.readdirSync(resolve(__dirname, "..", "styles")).forEach(file => {
    if(/scss$/i.test(file)) {
        const name = file.replace(/\.scss$/i, '');
        entry[name] = resolve(__dirname, '../styles', name + '.scss');
    }
});

module.exports = {
    // To enhance the debugging process. More info: https://webpack.js.org/configuration/devtool/
    devtool: 'sourcemap',
    target: 'web',
    entry: entry,
    output: {
        path: resolve(__dirname, '../dist/public'),
        filename: '[name].js',
        // necessary for HMR to know where to load the hot update chunks
        publicPath: '/',
        chunkFilename: '[name]-[id].js',
        libraryTarget: 'umd'
    },

    devServer: {
        // All options here: https://webpack.js.org/configuration/dev-server/

        // enable HMR on the server
        hot: true,
        // match the output path
        proxy: {
            '*': 'http://0.0.0.0:' + (process.env.PORT || 1337),
            ws: true
        },
        // match the output `publicPath`
        publicPath: '/',

        // Enable to integrate with Docker
        host: "0.0.0.0",

        port: 3000,
        historyApiFallback: true,
        // All the stats options here: https://webpack.js.org/configuration/stats/
        stats: {
            colors: true, // color is life
            chunks: false, // this reduces the amount of stuff I see in my terminal; configure to your needs
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
        new DashboardPlugin(),
        // new CheckerPlugin(),
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
        // enable HMR globally
        new webpack.HotModuleReplacementPlugin(),

        // prints more readable module names in the browser console on HMR updates
        new webpack.NamedModulesPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity,
            filename: 'vendor.js'
        }),

        // do not emit compiled assets that include errors
        new WebpackErrorNotificationPlugin(),
        new BellOnBundlerErrorPlugin(),
        new ExtractTextPlugin("style/[name].css"),
        new OfflinePlugin()
    ],
    module: {
        // loaders -> rules in webpack 2
        rules: [
            {
                test: /\.scss$/,
                use:
                    ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: [
                            {
                                loader: "css-loader", options: {
                                sourceMap: true,
                                modules: true,
                                importLoaders: 1,
                                localIdentName: '[local]---[hash:base64]'
                            }
                            },
                            'group-css-media-queries-loader',
                            {
                                loader: "sass-loader", options: {
                                sourceMap: true,
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
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            {
                test: /\.ts(x?)$/,
                use: [
                    {loader: 'react-hot-loader/webpack'},
                    // {
                    //     loader: 'babel-loader',
                    //     query: {
                    //         presets: ['es2015', 'stage-0']
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