const fs = require('fs');
const resolve = require('path').resolve;
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const WebpackErrorNotificationPlugin = require('webpack-error-notification');
const BellOnBundlerErrorPlugin = require('bell-on-bundler-error-plugin');
const BabiliPlugin = require("babili-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

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

module.exports = {
    // To enhance the debugging process. More info: https://webpack.js.org/configuration/devtool/
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
        // necessary for HMR to know where to load the hot update chunks
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
            "_route": resolve(__dirname, '..', 'route/index.tsx'),
            "_store": resolve(__dirname, '..', 'store/index.ts'),
            "_static": resolve(__dirname, '..', 'static'),
            "_stylesLoad": resolve(__dirname, '..', 'styles'),
            "_style": resolve(__dirname, '..', 'styles/index.ts')
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
                BROWSER: JSON.stringify(false),
                NODE_ENV: JSON.stringify('development'),
                DIR_PATH: JSON.stringify('dist/server'),
                ASSETS: {}
            }
        }),

        // prints more readable module names in the browser console on HMR updates
        new webpack.NamedModulesPlugin(),

        // do not emit compiled assets that include errors
        new WebpackErrorNotificationPlugin(),
        new BellOnBundlerErrorPlugin(),
        new ExtractTextPlugin("../public/style/[name].css"),
        new SpriteLoaderPlugin(),
    ],
    module: {
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
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
                include: resolve('./static'),
                options: {
                    extract: true,
                    spriteFilename: '../public/sprite.svg'
                }
            },
            // Once TypeScript is configured to output source maps we need to tell webpack
            // to extract these source maps and pass them to the browser,
            // this way we will get the source file exactly as we see it in our code editor.
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
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            {
                test: /\.ts(x?)$/,
                use: [
                    {
                        loader: 'string-replace-loader',
                        options: {
                            search: '_import',
                            replace: 'import',
                            flags: 'ig'
                        }
                    },
                    {loader: 'awesome-typescript-loader'}
                ],
                exclude: /node_modules/,
                include: [
                    resolve(__dirname, '..', 'server'),
                    resolve(__dirname, '..', 'route'),
                    resolve(__dirname, '..', 'store'),
                    resolve(__dirname, '..', 'styles'),
                    resolve(__dirname, '..', 'view')
                ],
            }
        ]
    }
};