# React 16 TypeScript Isomorphic Starter
with [rxjs v5.4.3](http://reactivex.io) + [Immutable v4.0.0-rc.4](https://facebook.github.io/immutable-js/)

[![Build Status](https://travis-ci.org/iHaiduk/react-typescript.svg?branch=master)](https://travis-ci.org/iHaiduk/react-typescript) [![dependencies Status](https://david-dm.org/iHaiduk/react-typescript/status.svg)](https://david-dm.org/iHaiduk/react-typescript)

This system was created for start any project on NodeJs and React.
### Built using
#### For styles
- [Webpack](https://webpack.github.io) v3.6.0
- [SCSS](http://sass-lang.com) + [sass-loader](https://github.com/webpack-contrib/sass-loader) v6.0.6
- [bootstrap](https://github.com/twbs/bootstrap) v4.0.0-beta
- [autoprefixer](https://github.com/postcss/autoprefixer) v7.1.4
- [cssnano](http://cssnano.co) v3.10.0 (only Environment production)
- BEM System
---------------
#### For frontend side
- [TypeScript](https://www.typescriptlang.org) v2.5.3 + [awesome-typescript-loader](https://github.com/s-panferov/awesome-typescript-loader) v3.2.3
- [React](https://facebook.github.io/react/) v16.0.0
- [redux](http://redux.js.org) v3.7.2
- [Webpack](https://webpack.github.io) v3.6.0
###### Other
- [classnames](https://github.com/JedWatson/classnames) v2.2.5
- [socket.io](https://socket.io) v2.0.3
- [React-redux](https://github.com/reactjs/react-redux) v5.0.6
- [redux-observable v0.16.0](https://redux-observable.js.org)
- [React-router](https://github.com/ReactTraining/react-router) v4.2.0
- [React-router-redux](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux) v5.0.0-alpha.6
- [react-helmet](https://github.com/nfl/react-helmet) v5.2.0
###### Babel
- [babel-loader](https://github.com/babel/babel-loader) v7.1.2
- [babel-plugin-transform-runtime](https://babeljs.io/docs/plugins/transform-runtime/) v6.23.0
- [babel-preset-es2015](https://babeljs.io/docs/plugins/preset-es2015/) v6.24.1
- [babel-preset-stage-0](https://babeljs.io/docs/plugins/preset-stage-0/) v6.24.1
- [babel-plugin-dynamic-import-webpack](https://github.com/airbnb/babel-plugin-dynamic-import-webpack) v1.0.1
---------------
#### For backend side
- [TypeScript](https://www.typescriptlang.org) v2.5.3
- [React](https://facebook.github.io/react/) v16.0.0
- [Koa](http://koajs.com) v2.3.0
- [koa-router](https://github.com/alexmingoia/koa-router) v7.2.1

###### DataBase and Memory
- [mongoose](http://mongoosejs.com) v4.12.0
- [moize](https://github.com/planttheidea/moize) v4.0.0

###### For user system
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js) v2.4.3
- [jsonwebtoken](https://jwt.io/) v8.0.1

###### For SVG
- [svg-sprite-loader](https://github.com/kisenka/svg-sprite-loader) v3.2.5
- [gulp-svgo](https://github.com/corneliusio/gulp-svgo) v1.2.5

###### Logging
- [pino](http://getpino.io/) v4.7.2

###### Other
- [ioredis](https://github.com/luin/ioredis) v3.1.4
- [elasticsearch](https://github.com/luin/ioredis) v13.3.1
- [classnames](https://github.com/JedWatson/classnames) v2.2.5
- [socket.io](https://socket.io) v2.0.3
- [redux](http://redux.js.org) v3.7.2
- [React-redux](https://github.com/reactjs/react-redux) v5.0.6
- [React-router](https://github.com/ReactTraining/react-router) v4.2.0
- [React-router-redux](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux) v5.0.0-alpha.6
- [react-helmet](https://github.com/nfl/react-helmet) v5.2.0

##Progressive Web App
- [offline-plugin](https://github.com/NekR/offline-plugin) v4.8.4

##Production process manager for Node.js
- [PM2](https://github.com/Unitech/pm2) v2.7.1

## Testing system
- [Jest](https://facebook.github.io/jest/) v21.2.1
- [TS-Jest](https://github.com/kulshekhar/ts-jest) v21.0.1

--------------------
### Other variants of project:
* [redux-thunk + redux-promise](https://github.com/iHaiduk/react-typescript/tree/thunk)
* [redux-saga + immutable](https://github.com/iHaiduk/react-typescript/tree/saga)
--------------------

# Getting Started
Requirement:

- NodeJS 8+
- MongoDB 3.4+
- Redis 4.0+
- Elasticsearch 5.6+

Install dependencies:

```
$ yarn install
```

```
$ npm install
```

### Running development server
#####Run webpack watcher backend changes:

```
npm run backend-watch
```
#####Run webpack watcher frontend changes (for assets) and run dev-server:

```
npm run dev-server
```
#####Run backend side
```
gulp backend
```
Visit [http://localhost:3000/](http://localhost:3000/).

### Running production server
This will build the assets for you on the first run. For subsequent starts, you should run:

```
npm run production
```
#####Run server:
```
npm start
```
Visit [http://localhost:1337/](http://localhost:1337/).

#####Restart server:
```
npm restart
```

#####Stop server:
```
npm stop
```

#####Kill process:
```
npm run kill
```

#####Show logs:
```
npm run logs
```

## Linting Test
##### Style
```
$ gem install scss_lint
```
```
$ npm run scss-lint
```
##### TypeScript
```
$ npm run lint-typescript
```
##### All
```
$ npm run lint
```

##Task lists
- [x] Create isomorphic application
- [x] Connect React & Redux & Router
- [x] Add database - MongoDB
- [x] Add Redis.io v4+
- [x] Connect socket.io with Redis
- [x] Add ServiceWorker and AppCache
- [x] PM2 Start server
- [x] SVG sprite generator
- [x] Load images from static
- [x] Tinypng for images
- [x] ~~Authorization Token System~~ System has JWT module
- [x] Update React to v16
- [x] Add pipelines testing [Travis CI](https://travis-ci.org/iHaiduk/react-typescript)
- [x] Add testing

Folder Structure Conventions
============================ 
    .
    ├── .awcache                # Cached build files
    ├── __tests__               # Folder with test files
    ├── client                  # Client load application
    ├── dist                    # Compiled files
    ├── route                   # Files for routing application
    ├── server                  # Server load applicaton
    ├── static                  # Static files
    ├── store                   # Redux store
    ├── styles                  # Application styles
    ├── view                    # React view components
    ├── webpack                 # Config for compilation
    ├── tools                   # Tools and utilities
    ├── .gitignore
    ├── .scss-lint.yml
    ├── .travis.yml             # Config file for Travis CI
    ├── ecosystem.json          # Config file for PM2
    ├── gulpfile.js
    ├── jestconfig.json         # Config file for Jest
    ├── package.json
    ├── README.md
    ├── tsconfig.json
    └── tslint.json
    
Folder Structure Compiled Files
============================ 
    .
    └── dist
        ├── public               # Assets folder
        └── server               # Server application
