const fs = require('fs');
const {resolve} = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const WebpackErrorNotificationPlugin = require('webpack-error-notification');
const BellOnBundlerErrorPlugin = require('bell-on-bundler-error-plugin');
const BabiliPlugin = require("babili-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const entry = {
    index: resolve(__dirname, '../server', 'index.ts'),
};

fs.readdirSync(resolve(__dirname, "..", "styles")).forEach(file => {
    if(/scss$/i.test(file)) {
        const name = file.replace(/\.scss$/i, '');
        entry[name] = resolve(__dirname, '../styles', name + '.scss');
    }
});

const assets = fs.readFileSync(resolve(__dirname, "..", "dist", "server", "manifest.json"), "utf-8");

module.exports = {
    // To enhance the debugging process. More info: https://webpack.js.org/configuration/devtool/
    devtool: 'sourcemap',
    target: 'node',
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
        new CleanWebpackPlugin(['./dist/server/'], {
            root: resolve(__dirname, '..'),
            verbose: true,
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
            options: {
                context: __dirname
            },
            root: resolve(__dirname, '..')
        }),
        new webpack.DefinePlugin({
            'process.env': {
                BROWSER: JSON.stringify(false),
                NODE_ENV: JSON.stringify('production'),
                WEB: JSON.stringify('production'),
                ASSETS: assets
            }
        }),

        new ExtractTextPlugin("style/[name].css"),
        new BabiliPlugin()
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
                    // {loader: 'react-hot-loader/webpack'},
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