# webpack-config-creator
My tool for fast creating a webpack developing environment easily, and also for memorizing.

It is recommended to install `cross-env` together to pass NODE_ENV in your command line.

## Install

```cmd
npm install webpack webpack-cli webpack-config-creator --dev
// or
yarn add webpack webpack-cli webpack-config-creator -D
```


## Usage

In your webpack config file like `webpack.config.js`

```js
const getConfig = require('webpack-config-creator');

// define env variable
process.env.CDN = '/cdn/assets/';

const config = getConfig({
  mode: process.env.NODE_ENV,
  rules: ['babel', 'vue', 'vue-scss', 'file-url', 'eslint'],
  devServer: true,
  defineEnv: ['CDN'],
  defineSass: {
    injectEnv: true,
    data: '@import "./src/variable.scss";',
  },
  template: true,
  extend(config) {
    // get created config to customize
    // the structure is same to webpack configs
  }
});

module.exports = config;
```


## Settings

### mode

  just the webpack config `mode`


### rules

  here uses the default settings for fast usage, since this plugin with not auto install all the package, please install the packages related to the following.

  - type: `Array(String[, String])`
  - allowed rules: `babel`, `css`, `scss`, `vue-scss`, `eslint`, `vue`, `vue-next`, `url`, `file-url`

#### babel

  This will inject default babel loaders with following settings, you can also overwrite it by your `.babelrc`...etc.

  - default dependencies: `babel-loader @babel/core @babel/preset-env @babel/runtime @babel/plugin-syntax-dynamic-import @babel/plugin-transform-runtime`

  > `resolve` get path from your root folder of project

```js
module.exporst = {
  test: /\.js$/,
  loader: 'babel-loader',
  exclude: /(node_modules|bower_components)/,
  include: [resolve('./src')],
  options: {
    presets: [
      [
        '@babel/preset-env',
        { modules: false }
      ]
    ],
    comments: false,
    plugins: [
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-transform-runtime'
    ]
  }
};
```

#### css

  - default dependencies: `style-loader css-loader mini-css-extract-plugin postcss-loader autoprefixer`

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';

const styleLoader = {
  loader: 'style-loader',
  options: {}
};

const cssLoader = {
  loader: 'css-loader',
  options: {
    sourceMap: true,
    esModule: false
  }
};

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: [
        'autoprefixer'
      ]
    },
  }
};

module.exports = {
  test: /\.css$/i,
  use: [
    isProd ? MiniCssExtractPlugin.loader : styleLoader,
    cssLoader,
    postcssLoader,
  ],
};
```

#### scss

Almost same as above `css`

  - default dependencies: css deps + `node-sass sass-loader`

```js
//...

const sassLoader = {
  loader: 'sass-loader',
  options: {
    sourceMap: true,
  },
};

module.exports = {
  test: /\.s?css$/i,
  use: [
    isProd ? MiniCssExtractPlugin.loader : styleLoader,
    cssLoader,
    postcssLoader,
    sassLoader,
  ],
};
```

#### eslint

  - default dependencies: `eslint eslint-loader babel-eslint`

```js
module.exports = {
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('./src')],
  options: { emitWarnings: true },
};
```

#### url

  - default dependencies: `url-loader`

```js
module.exports = {
  test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
  loader: 'url-loader',
  options: {
    limit: 1000,
    name: '[name].[ext]',
    outputPath: 'img',
    esModule: false,
  },
};
```

#### file-url

same as `url`, add fallback to file-loader

  - default dependencies: `url-loader file-loader`

```js
module.exports = {
  // ...same to url
  options: {
    // ...same to url
    fallback: require.resolve('file-loader'),
  },
};
```

#### vue-scss

just replace the `style-loader` to `vue-style-loader`, and will auto add `VueLoaderPlugin` into the config's plugins.

  - default dependencies: above sass deps + `vue-loader vue-loader-next@npm:vue-loader@16.0.0-beta.7`


#### vue

will use `vue2.6.12` for developing, and auto import the `vue-loader`.

  - default dependencies: `vue`

```js
module.exports = {
  test: /\.vue$/,
  use: 'vue-loader'
};
```


#### vue-next

  - default dependencies: `vue@npm:vue@3.0.0-rc.10`

will use `vue3.x` for developing, and auto import vue3's `vue-loader`

> be awared that, vue-loader for vue3.x is different from vue2, so if you use `vue-next` here, will auto give webpack an alias from `vue` to `vue-next`, which is installed together in package.json

```js
module.exports = {
  test: /\.vue$/,
  use: 'vue-loader-next' // this is installed for new vue-loader
};
```


### devServer

use default devServer settings as following:

  - type: `Boolean`
  - default dependencies: `webpack-dev-server`

```js
module.exports = {
  host: '0.0.0.0',
  disableHostCheck: true,
  inline: true,
  hot: true,
  historyApiFallback: true,
  overlay: { errors: true },
};
```


### defineEnv

env variables should be defined into webpack, use `definePlugin`.

  - type: `Array(String[, String])`

> you should define the env variables before geting the config, just as demo shows


### defineSass

define sass prepend datas

  - type: `Object({ injectEnv, data })`
    * injectEnv
      - type: `Boolean`
      - what: whether auto inject all env variables into sass variables before data
    * data
      - type: `String`
      - what: scss text to be prepend


### template

whether use html-webpack-plugin with default settings

  - type: `Boolean`

```js
module.exports = {
  template: resolve('./index.html'),
  filename: 'index.html',
  inject: true,
  minify: isProd
    ? {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      }
    : false,
};
```


### extend

customize your webpack config with this, you can provide both `Object` or `Function` to adjust the default webpack config

`Object` will be auto merged with `webpack-merge`.

`Function` will not, so remember to return the config after adjusting.

```js
// as Object
const myConfig = getConfig({
  //...
  extend: {
    devServer: {
      port: 3000,
    }
  }
})

// as Function
const myConfig = getConfig({
  //...
  extend(config) {
    config.module.rules.push(myNewRule);
    return config;
  }
})
```


## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2020-present, Johnny Wang