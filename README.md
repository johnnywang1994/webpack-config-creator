# webpack-config-creator
My tool for fast creating a webpack developing environment easily, and also for memorizing.

It is recommended to install `cross-env` together to pass NODE_ENV in your command line.

## Install

```cmd
npm install webpack-config-creator --dev
// or
yarn add webpack-config-creator -D
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

above will use an default base config as following:

you can easily overwrite these by using `extend` option

```js
const config = {
  entry: resolve('./src/main.js'),
  output: {
    path: resolve('./dist'),
    publicPath: '/'
  },
  optimization: {
    splitChunks: { chunks: 'all' },
  },
  resolve: {
    extensions: ['.mjs', '.js', '.vue', '.json', '.scss', '.svelte'],
    alias: {
      '@': resolve('./src'),
    }
  }
};
```


## Settings

### mode

  just the webpack config `mode`


### rules

  - type: `Array(String[, String])`
  - allowed rules: `babel`, `css`, `scss`, `vue-scss`, `eslint`, `vue`, `url`, `file-url`, `svelte`

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

since the `postcss-loader` is used by default if you use the css related rules, there should be a `browserslists` in your package.json.

  - default dependencies: `style-loader css-loader mini-css-extract-plugin postcss-loader autoprefixer`

```json
{
  // ...
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ]
}
```

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

  - default dependencies: css deps + `sass sass-loader`

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

should include the eslint config in `package.json` before using this.

And since the eslint-plugin-vue has two version, please manually install it into your node_modules rely on your usage version of vue.

please refer: [eslint-plugin-vue](https://eslint.vuejs.org/)

  - default dependencies: `eslint eslint-loader babel-eslint`

```js
// default eslint loader setting
module.exports = {
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('./src')],
  options: { emitWarnings: true },
};
```

```json
{
  "eslintConfig": {
    "extends": [
      // use eslint:recommended
      "webpack-config-creator/eslint"
      // for vue
      "webpack-config-creator/eslint/vue2"
      // for vue-next
      "webpack-config-creator/eslint/vue3"
    ]
  },
}
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

just replace the `style-loader` to `vue-style-loader`, and will auto add `VueLoaderPlugin` into the config's plugins. If you are using vue3.x, please install the beta version of vue-loader `vue-loader@16.0.0-beta.7`

  - default dependencies: above sass deps + `vue-loader`


#### vue

`vue` & `vue-loader` had to be installed, no matter vue2, vue3，the setting is the same, just install the version, will auto handle the compiler for it.

> be aware that the default vue-template-compiler's version is 2.6.12, make sure to install the same version of vue2. If you use vue3, then no need to install `@vue/compiler-sfc`, it'll also be installed by default.

  - default dependencies: `vue-template-compiler@2.6.12 @vue/compiler-sfc@3.0.0-rc.10`

```js
module.exports = {
  test: /\.vue$/,
  use: 'vue-loader'
};
```


#### svelte

- default dependencies: `svelte@3.29.0 svelte-loader@2.13.6 svelte-preprocess@4.5.1`

```js
const autoPreprocess = require('svelte-preprocess');

module.exports = {
  test: /\.svelte$/,
  exclude: /node_modules/,
  loader: 'svelte-loader',
  options: {
    preprocess: autoPreprocess({})
  }
};
```


### devServer

use default devServer settings as following:

  - type: `Boolean` || `Object`
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

if an object is provided, will use `Object.assign` to merge with default settings.


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

```js
module.exports = {
  defineSass: {
    injectEnv: true, // this will auto inject all the env variable into "data"
    data: '$node-env: ' + process.env.NODE_ENV + ';', // additionalData for sass options
  }
};
```


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