const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production';
const routes = require('./routes.config');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');




let entries = {}
let htmls = [];

const initEnitiesAndHtmls = () => {

  for (let key in routes) {
    let el = routes[key];
    el.name = key;
    entries[el.name] = el.entryFile;

    let options = {
      template: el.template || './public/index.html',
      chunks: el.chunks,
      name: el.name,
      filename: el.filename || `${el.name}.html`
    }
    htmls.push(
      new HtmlWebpackPlugin(options)
    )
  }

}

initEnitiesAndHtmls();

console.log(entries)

const plugins = htmls

if (!devMode) {
  plugins.push(new CleanWebpackPlugin())
  plugins.push(new MiniCssExtractPlugin({
    filename: '[name].[contenthash:7].css',
    chunkFilename: '[id].[contenthash:7].css',
  }))

}
module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: entries,
  output: {
    filename: devMode ? '[name].js' : '[name].[contenthash:7].js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    //port: 9000,
    // 自动打开浏览器
    //open: true,
    //hot: true, 
    // 告诉服务器从哪里dist目录中提供内容
    contentBase: './dist'
  },
  devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
  plugins: plugins,
  module: {
    rules: [

      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(html)$/,
        // exclude: /public/,
        use: {
          loader: 'html-loader',
          options: {
            //attrs: [':data-src']
          }
        }
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
          },
        }]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          process.env.NODE_ENV !== 'production' ? 'style-loader' :
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          {
            loader: 'style-resources-loader',
            options: {
              patterns: [
                path.resolve(__dirname, 'src/styles/core/index.scss')
              ]
            }
          }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
}
