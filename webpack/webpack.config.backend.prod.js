const fs = require('fs');
const {resolve} = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const BabiliPlugin = require("babel-minify-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const vendorStyles = require("./vendor.style").default;
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const aliases = require("./webpack.backend.aliases").default;

const Hashids = require('hashids');

const entry = {
    index: resolve(__dirname, '../server', 'index.ts'),
};

fs.readdirSync(resolve(__dirname, "..", "styles")).forEach(file => {
    if(/scss$/i.test(file)) {
        const name = file.replace(/\.scss$/i, '');
        entry[name] = resolve(__dirname, '../styles', name + '.scss');
    }
});
entry['base'] = [entry['base'], ...vendorStyles];
const assets = fs.readFileSync(resolve(__dirname, "..", "dist", "server", "manifest.json"), "utf-8");

module.exports = {
    devtool: 'sourcemap',
    target: 'node',
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
        alias: aliases,
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
            'process.env.BROWSER': JSON.stringify(false),
            'process.env.ASSETS': assets
        }),

        new ExtractTextPlugin("style/[name].css"),
        new BabiliPlugin(),
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
                test: /\.s[ac]ss$/,
                use:
                    ExtractTextPlugin.extract({
                        fallback: "style-loader?sourceMap=false",
                        use: [
                            {
                                loader: "css-loader", options: {
                                sourceMap: false,
                                modules: true,
                                importLoaders: 3,
                                minimize: true,
                                localIdentName: '[md5:hash:hex:6]',
                                getLocalIdent: (context, localIdentName, localName) => {
                                    const hashids = new Hashids(localName);
                                    const lngt = localName.length;
                                    const name = hashids.encode(lngt, lngt, lngt).replace(/^\d/ig, "_" + hashids.encode(1));
                                    return name;
                                }
                            }
                            },
                            'group-css-media-queries-loader',
                            {
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: false,
                                    plugins: () => [require('autoprefixer')({
                                        browsers: [
                                            'last 2 versions',
                                            '> 1%',
                                            'android 4',
                                            'iOS 9',
                                        ],
                                        cascade: false
                                    })]
                                }
                            },
                            {
                                loader: "sass-loader", options: {
                                sourceMap: false,
                                // indentedSyntax: true,
                                modules: true,
                            }
                            },
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