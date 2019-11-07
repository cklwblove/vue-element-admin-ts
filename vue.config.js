'use strict';

const path = require('path');
const {formatDate} = require('@liwb/cloud-utils');
const webpack = require('webpack');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');
const pkg = require('./package.json');

const port = 5577;
// page title
const name = `${pkg.name}`;

const cdn = {
  // inject tinymce into index.html
  // why use this cdn, detail see https://github.com/PanJiaChen/tinymce-all-in-one
  js: ['https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.2/tinymce.min.js']
};

const resolve = (dir) => {
  return path.join(__dirname, './', dir);
};

const isProd = () => {
  return process.env.NODE_ENV === 'production';
};

function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, 'src/assets/less/variable.less'),
        path.resolve(__dirname, 'node_modules/magicless/magicless.less')
      ],
      injector: 'prepend'
    });
}

const getOptimization = () => {
  let optimization = {};
  if (isProd()) {
    optimization = {
      // https://webpack.docschina.org/configuration/optimization/#optimization-minimizer
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
            compress: {
              warnings: false,
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['console.log']
            }
          }
        })
      ]
    };
  }
  return optimization;
};

const genPlugins = () => {
  const plugins = [
    new ProgressBarPlugin({
      format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
      clear: false
    }),
    new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest: require('./public/vendor/element-manifest.json')
    }),
    new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest: require('./public/vendor/axios-manifest.json')
    }),
    new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest: require('./public/vendor/vendor-manifest.json')
    }),
    // 将 dll 注入到 生成的 html 模板中
    new AddAssetHtmlPlugin({
      // dll文件位置
      filepath: path.resolve(__dirname, './public/vendor/*.js'),
      // dll 引用路径
      publicPath: './vendor',
      // dll最终输出的目录
      outputPath: './vendor'
    }),
    new AddAssetHtmlPlugin({
      // dll文件位置
      filepath: path.resolve(__dirname, './public/config.local.js'),
      hash: true
    }),
    new AddAssetHtmlPlugin({
      // dll文件位置
      filepath: path.resolve(__dirname, './public/vendor/*.css'),
      // dll 引用路径
      publicPath: './vendor',
      // dll最终输出的目录
      outputPath: './vendor',
      typeOfAsset: 'css'
    }),
    // bannerPlugin
    new webpack.BannerPlugin({
      banner: `Current version ${pkg.version} and build time ${formatDate(
        new Date(),
        'yyyy-MM-dd HH:mm:ss'
      )}`
    })
  ];

  if (isProd()) {
    plugins.push(
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(
          '\\.(' +
          ['js', 'css'].join('|') +
          ')$'
        ),
        threshold: 10240,
        minRatio: 0.8,
        cache: true
      })
    );
  }

  return plugins;
};

module.exports = {
  /**
   * You can set by yourself according to actual condition
   * You will need to set this if you plan to deploy your site under a sub path,
   * for example GitHub pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then assetsPublicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail https://cli.vuejs.org/config/#baseurl
   */
  publicPath: './',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV !== 'production',
  productionSourceMap: false,
  // webpack-dev-server 相关配置
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port,
    https: false,
    hotOnly: false,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      // change xxx-api/login => mock/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: `http://localhost:${port}/mock`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    },
    after: require('./mock/mockServer.ts')
  },
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: isProd() ? true : false,
    // 开启 CSS source maps?
    sourceMap: isProd() ? true : false,
    // css预设器配置项
    loaderOptions: {}
  },
  configureWebpack: () => ({
    name: name,
    resolve: {
      alias: {
        '@': resolve('src'),
        '@assets': resolve('src/assets'),
        '@less': resolve('src/assets/less'),
        '@js': resolve('src/assets/js'),
        '@components': resolve('src/components'),
        '@mixins': resolve('src/mixins'),
        '@filters': resolve('src/filters'),
        '@store': resolve('src/store'),
        '@views': resolve('src/views'),

        // 文件别名
        'services': resolve('src/services'),
        'variable': resolve('src/assets/less/variable.less'),
        'mixins': resolve('node_modules/magicless/magicless.less')
      }
    },
    plugins: genPlugins(),
    // 生产环境去掉 console.log
    // https://github.com/cklwblove/vue-cli3-template/issues/12
    optimization: getOptimization()
  }),
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: (config) => {
    // module

    // style-resources-loader
    // const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    // types.forEach((type) =>
    //   addStyleResource(config.module.rule('less').oneOf(type))
    // );

    config
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      );

    // runtime.js 内联的形式嵌入
    config
      .plugin('preload')
      .tap(args => {
        args[0].fileBlacklist.push(/runtime\./);
        return args;
      });

    // plugin
    // webpack-html-plugin
    config
      .plugin('html')
      .tap(args => {
        args[0].cdn = cdn;
        args[0].minify = {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        };
        return args;
      });

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true;
        return options;
      })
      .end();

    // optimization
    // https://imweb.io/topic/5b66dd601402769b60847149
    config
      .when(process.env.NODE_ENV === 'production',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end();
          config
            .optimization
            .splitChunks({
              chunks: 'all',
              cacheGroups: {
                vendors: {
                  name: 'chunk-vendors',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // 只打包初始时依赖的第三方
                },
                // elementUI: {
                //   name: 'chunk-elementUI', // split elementUI into a single package
                //   priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                //   test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                // },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // 可自定义拓展你的规则
                  minChunks: 3, // 最小公用次数
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            });
          config.optimization.runtimeChunk('single');
        }
      );

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run analyz`
    config
      .when(process.env.IS_ANALYZ,
        config => config
          .plugin('webpack-bundle-analyzer')
          .use(BundleAnalyzerPlugin, [{
            analyzerPort: 8888,
            generateStatsFile: false
          }])
      );

    // `npm run build --generate_report`
    config
      .when(process.env.npm_config_generate_report,
        config => config
          .plugin('webpack-bundle-analyzer-report')
          .use(BundleAnalyzerPlugin, [{
            analyzerMode: 'static',
            reportFilename: 'bundle-report.html',
            openAnalyzer: false
          }])
      );
  }
};
