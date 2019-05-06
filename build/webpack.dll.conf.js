const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// dll文件存放的目录
const dllPath = '../public/vendor';

module.exports = {
  mode: 'production',
  entry: {
    // 需要提取的库文件
    element: ['element-ui', 'element-ui/lib/theme-chalk/index.css'],
    axios: ['axios'],
    vendor: ['vue', 'vue-router', 'vuex', 'normalize.css']
  },
  module: {
    rules:[
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[hash:7].[ext]'
        }
      },
      ...utils.styleLoaders({
        sourceMap: false,
        extract: true,
        usePostCSS: true
      })
    ]
  },
  output: {
    path: path.join(__dirname, dllPath),
    filename: '[name].dll.js',
    // vendor.dll.js中暴露出的全局变量名
    // 保持与 webpack.DllPlugin 中名称一致
    library: '[name]_[hash]'
  },
  optimization: {
    minimizer: [
      // Compress extracted CSS. We are using this plugin so that possible
      // duplicated CSS from different components can be deduped.
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    // 清除之前的dll文件
    new CleanWebpackPlugin(),
    // 设置环境变量
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: 'production'
      }
    }),
    // extract css into its own file
    new MiniCssExtractPlugin({
      filename: '[name].dll.css'
    }),
    // manifest.json 描述动态链接库包含了哪些内容
    new webpack.DllPlugin({
      path: path.join(__dirname, dllPath, '[name]-manifest.json'),
      // 保持与 output.library 中名称一致
      name: '[name]_[hash]',
      context: process.cwd()
    })
  ]
};
