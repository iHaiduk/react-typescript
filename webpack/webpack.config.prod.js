const fs = require('fs');
const resolve = require('path').resolve;
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WebpackErrorNotificationPlugin = require('webpack-error-notification');
const BellOnBundlerErrorPlugin = require('bell-on-bundler-error-plugin');
const OfflinePlugin = require('offline-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const vendorStyles = require("./vendor.style").default;
const vendorScripts = require("./vendor.scripts").default;

const entry = process.env.TEMP_NAME ? {bundle: process.env.TEMP_NAME} : {
    bundle: './client/index.tsx',
    vendor: vendorScripts,
    style: './styles/index.ts',
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
entry['base'] = [entry['base'], ...vendorStyles];

const plugins = [
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

    new ExtractTextPlugin("style/[name].css?[hash]")
];

if(process.env.TEMP_NAME === undefined) {
    plugins.push(new CleanWebpackPlugin(['./dist/public/'], {
        root: resolve(__dirname, '..'),
        verbose: true,
    }));
    plugins.push(new webpack.NoEmitOnErrorsPlugin());
    plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
    plugins.push(new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity,
        filename: 'vendor.js?[hash]'
    }));
    plugins.push(new WebpackErrorNotificationPlugin());
    plugins.push(new BellOnBundlerErrorPlugin());
    plugins.push(new OfflinePlugin({
        excludes: excludes_offline,
        responseStrategy: 'network-first',
        ServiceWorker: {
            minify: true
        }
    }));
    plugins.push(new ManifestPlugin({
        fileName: "../server/manifest.json"
    }),);
    plugins.push(new SpriteLoaderPlugin());
}

module.exports = {
    devtool: false,
    target: 'web',
    entry: entry,
    output: {
        path: resolve(__dirname, '../dist/public'),
        publicPath: '/',
        libraryTarget: 'umd',
        filename: '[name].js?[hash]',
        sourceMapFilename: '[name].js.map?[hash]',
        chunkFilename: '[name].[hash:4].js',
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
            "_reducer": resolve(__dirname, '..', 'store/reducers'),
            "_route": resolve(__dirname, '..', 'route/index.tsx'),
            "_store": resolve(__dirname, '..', 'store/index.ts'),
            "_static": resolve(__dirname, '..', 'static'),
            "_images": resolve(__dirname, '..', 'static/images'),
            "_stylesLoad": resolve(__dirname, '..', 'styles'),
            "_style": resolve(__dirname, '..', 'styles/index.ts'),
            "_utils": resolve(__dirname, '..', 'utils')
        }
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
                            sourceMap: false,
                            modules: true,
                            minimize: true,
                            localIdentName: '[local]',
                            importLoaders: 1,
                        }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: false,
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
                        },
                    ]
                })
            },
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
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: false,
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
                            },
                            {
                                loader: "sass-loader", options: {
                                    sourceMap: false,
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
                test: /\.ts(x?)$/,
                use: [
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