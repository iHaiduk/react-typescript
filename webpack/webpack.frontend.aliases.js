"use strict";
const resolve = require('path').resolve;

const alias = {
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
};
exports.default = alias;