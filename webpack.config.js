var nodeExternals = require('webpack-node-externals');
var webpack = require('webpack');
var browserify = require('browserify');
var path = require('path');
var fs = require('fs');
var os = require('os');
var deleteEmpty = require('delete-empty');
var PACKAGE_FILE = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf-8'));
var LIB_NAME = PACKAGE_FILE.name;

/* helper function to get into build directory */
var libPath = function(name) {
  if ( undefined === name ) {
    return 'dist';
  }

  return path.join('dist', name);
}



var webpack_opts = {
  entry: './src/index.ts',
  target: 'node',
  output: {
    filename: libPath('index.js'),
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [
      'node_modules',
      'src',
    ]
  },
  module: {
    loaders: [
      {
        enforce: 'pre',
        test: /\.ts$/,
        loader: 'tslint-loader',
        exclude: /node_modules/,
      }, {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: [
          /node_modules/
        ],
      },
    ],
  },
  externals: [nodeExternals()],
  plugins: [
    //new webpack.optimize.UglifyJsPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        tslint: {
          emitErrors: true,
          failOnHint: true
        }
      }
    }),
  
  ],
}



module.exports = webpack_opts;
