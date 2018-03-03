import path from 'path';
import { LoaderOptionsPlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FlowBabelWebpackPlugin from 'flow-babel-webpack-plugin';

const production = process.env.NODE_ENV === 'production';

let config =  {
  entry: {
    'app': [
      'babel-polyfill',
      'react-hot-loader/patch',
      path.join(__dirname, './src/index.jsx'),
    ]
  },
  output: {
    path: path.join(__dirname, './public'),
    filename: production ? 'app.[hash].js' : 'app.js',
    sourceMapFilename: 'app.js.map',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve('./src'),
      path.resolve('./resources'),
      path.resolve('./node_modules'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: [
          /node_modules/,
          /src\/server/,
        ],
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader', {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: production ? '[hash:base64]' : '[name]-[local]-[hash:base64:5]',
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.(gif|jpe?g|png|ico)$/,
        loader: 'url-loader',
        options: {
          limit: 25000,
        },
      },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
        options: {
          publicPath: '/',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.join(__dirname, './public/index.html'),
      template: path.join(__dirname, './src/index.html'),
    }),
    new LoaderOptionsPlugin({
      minimize: production,
      sourceMap: !production,
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, './public'),
    port: 8080,
  },
};

if (!production) {
  config.plugins.push(new FlowBabelWebpackPlugin());
}

module.exports = config;
