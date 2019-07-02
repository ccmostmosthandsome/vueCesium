// 去console插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// gzip压缩插件
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// 拷贝文件插件
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
//const path = require('path')

const debug = process.env.NODE_ENV !== 'production'
let cesiumSource = './node_modules/cesium/Source'
let cesiumWorkers = '../Build/Cesium/Workers'


const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}
// 项目部署基础
// 默认情况下，我们假设你的应用将被部署在域的根目录下,
// 例如：https://www.my-app.com/
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'
const BASE_URL = process.env.NODE_ENV === 'production'
  ? './'
  : '/'
console.log("部署环境:"+process.env.NODE_ENV);
console.log("publicPath:"+BASE_URL);

module.exports = {
  //baseUrl: BASE_URL,//已经弃用
  publicPath:BASE_URL,//部署应用包时的基本 URL
  assetsDir: 'static',//部署应用包时放置静态资源的地方
  lintOnSave: false, // 如果你不需要使用eslint，把lintOnSave设为false即可
  productionSourceMap: false,// 打包时不生成.map文件
  devServer:{//配置服务器
    host:"localhost",
    port:"8066",
    proxy:{//配置代理服务器
      '/api':{//请求路径需要包含的路径
        target: 'http://localhost:8080',//目标服务器
        pathRewrite: {'^/api':''}, // 路径重写  用 " " 替换 "/api" 
        changeOrigin:true//创建虚拟代理服务器
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))
  },
  configureWebpack: {//配置Webpack
    devtool: 'source-map',//在浏览器中显示vue源码用来调试
    output: {
      sourcePrefix: ' '
    },
    amd: {
      toUrlUndefined: true
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': path.resolve('src'),
        'cesium': path.resolve(__dirname, cesiumSource)
      }
    },
    plugins: [
      // new UglifyJsPlugin({
      //     uglifyOptions: {
      //         compress: {
      //             warnings: false,
      //             drop_debugger: true,
      //             drop_console: true,
      //         },
      //     },
      //     sourceMap: false,
      //     parallel: true,
      // }),
      // new CompressionWebpackPlugin({
      //     asset: '[path].gz[query]',
      //     algorithm: 'gzip',
      //     test: new RegExp(
      //         '\\.(' +
      //         ['js', 'css'].join('|') +
      //         ')$',
      //     ),
      //     threshold: 10240,
      //     minRatio: 0.8,
      // }),
      // new webpack.optimize.CommonsChunkPlugin({
      //   chunks: ['layer'],
      //   // 开发环境下需要使用热更新替换，而此时common用chunkhash会出错，可以直接不用hash
      //   filename: '[name].js' + (isProduction ? '?[chunkhash:8]' : ''),
      //   name: 'common'
      // }),
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'cesium',
      //   minChunks: module => module.context && module.context.indexOf('cesium') !== -1
      // }),
      new CopyWebpackPlugin([{from: path.join(cesiumSource, cesiumWorkers), to: 'static/Workers'}]),
      new CopyWebpackPlugin([{from: path.join(cesiumSource, 'Assets'), to: 'static/Assets'}]),
      new CopyWebpackPlugin([{from: path.join(cesiumSource, 'Widgets'), to: 'static/Widgets'}]),
      new CopyWebpackPlugin([{from: path.join(cesiumSource, 'ThirdParty/Workers'), to: 'static/ThirdParty/Workers'}]),
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify('./static')
      })
    ],
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            name: 'Cesium',
            test: /[\\/]node_modules[\\/]cesium/,
            chunks: 'all'
          }
        }
      }
    },
    module: {
      // noParse: [/videojs-contrib-hls/],
      // rules: [
      //   {
      //     test: require.resolve('jquery'),
      //     use: [{
      //       loader: 'expose-loader',
      //       options: 'jQuery'
      //     }, {
      //       loader: 'expose-loader',
      //       options: '$'
      //     }]
      //   }],
      unknownContextCritical: /^.\/.*$/,
      unknownContextCritical: false

    }
  },
  css: {
    // 启用 CSS modules
    modules: false,
    // 是否使用css分离插件
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {}
  }
}
