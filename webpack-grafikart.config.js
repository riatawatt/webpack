const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const dev = process.env.NODE_ENV === 'dev';
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin'); //installed via npm	
const CleanFileWebpackPlugin = require('webpack-clean'); //installed via npm	
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let cssLoaders = [
	{ loader: 'css-loader', options: { importLoaders: 1, minimize: !dev, url: true } }
];

if (!dev) {
	cssLoaders.push({
			loader: 'postcss-loader',
			options: {
			    plugins: (loader) => [
			      require('autoprefixer')({
			      	browsers: ['last 2 versions', 'ie > 8']
			      })
			    ]
			}
		});
}

let config = {
	mode: 'development',
	entry: {
		index1: ['./assets/css/app.scss', './src/index.js'],
		index2: './src/index2.js'
	},
	watch: dev,
	devtool: dev ? "cheap-module-source-map" : "source-map",		
	output: {
		filename: dev ? '[name].bundle.js' : '[name].[chunkhash:8].bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: [
					'babel-loader'
				]
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
		          fallback: "style-loader",
		          use: cssLoaders	
		        })
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
		          fallback: "style-loader",
		          use: [
		          	...cssLoaders,
		          	'sass-loader'
		          ]
		        })
			},
			 {
		        test: /\.(png|jpg|gif)$/,
		        use: [
		          {
		            loader: 'url-loader',
		            options: {
		              limit: 8192
		            }
		          }
		        ]
		      }
		]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: dev ? "[name].css" : "[name].[md5:contenthash:base64:12].css",
			disable: dev
		})
	]
};

if (!dev) {
	config.plugins.push(new UglifyJSPlugin({
		sourceMap: true
	}));
	config.plugins.push(new ManifestPlugin());
	config.plugins.push(new CleanWebpackPlugin(['dist'], {
		root: path.resolve('./'),
		verbose: true, 
		dry: false
	}));
}

module.exports = config;