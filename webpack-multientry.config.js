const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');	
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
  	app: './src/index.js',
  	print: './src/print.js'
  },
  plugins:[
   	new CleanWebpackPlugin(['dist']),
  	new HtmlWebpackPlugin({
  		title: 'output management'
  		}
  	)
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  }
};


  