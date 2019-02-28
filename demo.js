$ vue-cli-service inspect --mode production
{
  mode: 'production',
    context: '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts',
  devtool: false,
  node: {
  setImmediate: false,
    process: 'mock',
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
},
  output: {
    path: '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/dist',
      filename: 'static/js/[name].[contenthash:8].js',
      publicPath: '',
      chunkFilename: 'static/js/[name].[contenthash:8].js'
  },
  resolve: {
    alias: {
      '@': '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/src',
        vue$: 'vue/dist/vue.runtime.esm.js',
        '@assets': '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/src/assets',
        '@less': '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/src/assets/less',
        '@js': '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/src/assets/js',
        '@components': '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/src/components',
        '@mixins': '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/src/mixins',
        '@filters': '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/src/filters',
        '@store': '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/src/store',
        '@views': '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/src/views',
        services: '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/src/services',
        variable: '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/src/assets/less/variable.less',
        utils: '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/node_modules/@liwb/cloud-utils/dist/cloud-utils.esm',
        mixins: '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/node_modules/magicless/magicless.less'
    },
    extensions: [
      '.mjs',
      '.js',
      '.jsx',
      '.vue',
      '.json',
      '.wasm',
      '.ts',
      '.tsx'
    ],
      modules: [
      'node_modules',
      '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/node_modules',
      '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/node_modules/@vue/cli-service/node_modules'
    ]
  },
  resolveLoader: {
    modules: [
      '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/node_modules/@vue/cli-plugin-typescript/node_modules',
      '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/node_modules/@vue/cli-plugin-babel/node_modules',
      'node_modules',
      '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/node_modules',
      '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/node_modules/@vue/cli-service/node_modules'
    ]
  },
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
      rules: [
      /* config.module.rule('vue') */
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/node_modules/.cache/vue-loader',
              cacheIdentifier: '65361520'
            }
          },
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              },
              cacheDirectory: '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/node_modules/.cache/vue-loader',
              cacheIdentifier: '65361520'
            }
          }
        ]
      },
      /* config.module.rule('images') */
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'static/img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('svg') */
      {
        test: /\.(svg)(\?.*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'static/img/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      /* config.module.rule('media') */
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'static/media/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('fonts') */
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'static/fonts/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('pug') */
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-plain-loader'
          }
        ]
      },
      /* config.module.rule('css') */
      {
        test: /\.css$/,
        oneOf: [
          /* config.module.rule('css').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  publicPath: '../../'
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          },
          /* config.module.rule('css').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  publicPath: '../../'
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 2
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          },
          /* config.module.rule('css').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  publicPath: '../../'
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          },
          /* config.module.rule('css').oneOf('normal') */
          {
            use: [
              {
                loader: '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  publicPath: '../../'
                }
              },

              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 2
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('postcss') */
      {
        test: /\.p(ost)?css$/,
        oneOf: [
          /* config.module.rule('postcss').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  publicPath: '../../'
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          },
          /* config.module.rule('postcss').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  publicPath: '../../'
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 2
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          },
          /* config.module.rule('postcss').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  publicPath: '../../'
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          },
          /* config.module.rule('postcss').oneOf('normal') */
          {
            use: [
              {
                loader: '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  publicPath: '../../'
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 2
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('scss') */
      {
        test: /\.scss$/,
        oneOf: [
          /* config.module.rule('scss').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  publicPath: '../../'
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          },
          /* config.module.rule('scss').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  publicPath: '../../'
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 2
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          },
          /* config.module.rule('scss').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  publicPath: '../../'
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          },
          /* config.module.rule('scss').oneOf('normal') */
          {
            use: [
              {
                loader: '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  publicPath: '../../'
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 2
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('sass') */
      {
        test: /\.sass$/,
        oneOf: [
          /* config.module.rule('sass').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  publicPath: '../../'
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                  indentedSyntax: true
                }
              }
            ]
          },
          /* config.module.rule('sass').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  publicPath: '../../'
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 2
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                  indentedSyntax: true
                }
              }
            ]
          },
          /* config.module.rule('sass').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  publicPath: '../../'
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                  indentedSyntax: true
                }
              }
            ]
          },
          /* config.module.rule('sass').oneOf('normal') */
          {
            use: [
              {
                loader: '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  publicPath: '../../'
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 2
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                  indentedSyntax: true
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('less') */
      {
        test: /\.less$/,
        oneOf: [
          /* config.module.rule('less').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  publicPath: '../../'
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'less-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          },
          /* config.module.rule('less').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  publicPath: '../../'
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 2
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'less-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          },
          /* config.module.rule('less').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  publicPath: '../../'
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'less-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          },
          /* config.module.rule('less').oneOf('normal') */
          {
            use: [
              {
                loader: '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  publicPath: '../../'
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 2
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'less-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('stylus') */
      {
        test: /\.styl(us)?$/,
        oneOf: [
          /* config.module.rule('stylus').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  publicPath: '../../'
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: true,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          },
          /* config.module.rule('stylus').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  publicPath: '../../'
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 2
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: true,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          },
          /* config.module.rule('stylus').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  publicPath: '../../'
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: true,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          },
          /* config.module.rule('stylus').oneOf('normal') */
          {
            use: [
              {
                loader: '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  publicPath: '../../'
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 2
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: true,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('js') */
      {
        test: /\.jsx?$/,
        exclude: [
          function () { /* omitted long function */ }
        ],
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/node_modules/.cache/babel-loader',
              cacheIdentifier: '352592c4'
            }
          },
          {
            loader: 'thread-loader'
          },
          {
            loader: 'babel-loader'
          }
        ]
      },
      /* config.module.rule('ts') */
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/node_modules/.cache/ts-loader',
              cacheIdentifier: '26e2811a'
            }
          },
          {
            loader: 'thread-loader'
          },
          {
            loader: 'babel-loader'
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              appendTsSuffixTo: [
                '\\.vue$'
              ],
              happyPackMode: true
            }
          }
        ]
      },
      /* config.module.rule('tsx') */
      {
        test: /\.tsx$/,
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/node_modules/.cache/ts-loader',
              cacheIdentifier: '26e2811a'
            }
          },
          {
            loader: 'thread-loader'
          },
          {
            loader: 'babel-loader'
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              happyPackMode: true,
              appendTsxSuffixTo: [
                '\\.vue$'
              ]
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      {
        options: {
          test: /\.m?js(\?.*)?$/i,
          chunkFilter: () => true,
          warningsFilter: () => true,
          extractComments: false,
          sourceMap: false,
          cache: true,
          cacheKeys: defaultCacheKeys => defaultCacheKeys,
          parallel: true,
          include: undefined,
          exclude: undefined,
          minify: undefined,
          terserOptions: {
            output: {
              comments: /^\**!|@preserve|@license|@cc_on/i
            },
            compress: {
              arrows: false,
              collapse_vars: false,
              comparisons: false,
              computed_props: false,
              hoist_funs: false,
              hoist_props: false,
              hoist_vars: false,
              inline: false,
              loops: false,
              negate_iife: false,
              properties: false,
              reduce_funcs: false,
              reduce_vars: false,
              switches: false,
              toplevel: false,
              typeofs: false,
              booleans: true,
              if_return: true,
              sequences: true,
              unused: true,
              conditionals: true,
              dead_code: true,
              evaluate: true
            },
            mangle: {
              safari10: true
            }
          }
        }
      }
    ],
      splitChunks: {
      chunks: 'all',
        cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
            test: /[\\\/]node_modules[\\\/]/,
            priority: 10,
            chunks: 'initial'
        },
        commons: {
          name: 'chunk-commons',
            test: '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/src/components',
            minChunks: 3,
            priority: 5,
            reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: 'single'
  },
  plugins: [
    /* config.plugin('vue-loader') */
    new VueLoaderPlugin(),
    /* config.plugin('define') */
    new DefinePlugin(
      {
        'process.env': {
          VUE_APP_CLI_UI_URL: '""',
          NODE_ENV: '"production"',
          VUE_APP_BASE_API: '"/api"',
          BASE_URL: '""'
        }
      }
    ),
    /* config.plugin('case-sensitive-paths') */
    new CaseSensitivePathsPlugin(),
    /* config.plugin('friendly-errors') */
    new FriendlyErrorsWebpackPlugin(
      {
        additionalTransformers: [
          function () { /* omitted long function */ }
        ],
        additionalFormatters: [
          function () { /* omitted long function */ }
        ]
      }
    ),
    /* config.plugin('extract-css') */
    new MiniCssExtractPlugin(
      {
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].css'
      }
    ),
    /* config.plugin('optimize-css') */
    new OptimizeCssnanoPlugin(
      {
        sourceMap: false,
        cssnanoOptions: {
          preset: [
            'default',
            {
              mergeLonghand: false,
              cssDeclarationSorter: false
            }
          ]
        }
      }
    ),
    /* config.plugin('hash-module-ids') */
    new HashedModuleIdsPlugin(
      {
        hashDigest: 'hex'
      }
    ),
    /* config.plugin('named-chunks') */
    new NamedChunksPlugin(
      function () { /* omitted long function */ }
    ),
    /* config.plugin('html') */
    new HtmlWebpackPlugin(
      {
        templateParameters: function () { /* omitted long function */ },
        minify: {
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
        },
        template: '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/public/index.html'
      }
    ),
    /* config.plugin('pwa') */
    new HtmlPwaPlugin(
      {
        name: 'vue-element-admin-ts'
      }
    ),
    /* config.plugin('preload') */
    new PreloadPlugin(
      {
        rel: 'preload',
        include: 'initial',
        fileBlacklist: [
          /\.map$/,
          /hot-update\.js$/,
          /runtime\./
        ]
      }
    ),
    /* config.plugin('prefetch') */
    new PreloadPlugin(
      {
        rel: 'prefetch',
        include: 'asyncChunks'
      }
    ),
    /* config.plugin('copy') */
    new CopyWebpackPlugin(
      [
        {
          from: '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/public',
          to: '/Users/liwb/Desktop/liwb_work/cklwblove/vue-element-admin-ts/dist',
          toType: 'dir',
          ignore: [
            '.DS_Store'
          ]
        }
      ]
    ),
    /* config.plugin('workbox') */
    new GenerateSW(
      {
        exclude: [
          /\.map$/,
          /img\/icons\//,
          /favicon\.ico$/,
          /manifest\.json$/
        ],
        cacheId: 'vue-element-admin-ts'
      }
    ),
    /* config.plugin('fork-ts-checker') */
    new ForkTsCheckerWebpackPlugin(
      {
        vue: true,
        tslint: false,
        formatter: 'codeframe',
        checkSyntacticErrors: true
      }
    ),
    /* config.plugin('ScriptExtHtmlWebpackPlugin') */
    new (require('script-ext-html-webpack-plugin'))(
      {
        inline: /runtime\..*\.js$/
      }
    ),
    function () {},
    {
      options: {
        test: /\.(js|css)$/,
        include: undefined,
        exclude: undefined,
        cache: true,
        algorithm: function () { /* omitted long function */ },
        compressionOptions: {
          level: 9
        },
        filename: '[path].gz[query]',
        threshold: 10240,
        minRatio: 0.8,
        deleteOriginalAssets: false
      }
    },
    {
      options: {
        assets: [
          'config.local.js'
        ],
        jsExtensions: [
          '.js'
        ],
        cssExtensions: [
          '.css'
        ],
        append: false,
        publicPath: true,
        hash: true,
        files: undefined
      }
    }
  ],
    entry: {
  app: [
    './src/main.ts'
  ]
},
  name: 'vue-element-admin-ts'
}

Total task duration: 2.25s
