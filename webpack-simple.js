// node version: 8.11.3, using yarn
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");
const path = require('path');
const postCssScss = require('postcss-scss');

module.exports = {
	"mode": "development",
	"entry": "./src/index.js",
	"output": {
		"path": path.resolve(__dirname, '../assets'),
		"publicPath": '/themes/Byluxe/assets/',
		"filename": "js/theme.js"
	},
	"devtool": "source-map",
	"module": {
		"rules": [
		{
			"test": /\.js/,
			"exclude": /node_modules/,
			"use": 'babel-loader'
		},
		{
			"test": /\.scss$/,
			"use": [
			MiniCssExtractPlugin.loader,
			{
				loader: 'css-loader',
				options: {
					sourceMap: true
				}
			},
			{
				loader: 'postcss-loader',
				options: {
					sourceMap: true,
					syntax: postCssScss,
					plugins: () => [
					autoprefixer({flexbox: true})
					],
				},
			},
			{
				loader: 'sass-loader',
				options: {
					sourceMap: true,
					includePaths: [path.resolve(__dirname, 'node_modules/compass-mixins/lib')]
				}
			}
			]
		},
		{
			test: /\.css$/,
			use: [
				'style-loader',
				'css-loader', 
				{
	                loader: 'postcss-loader',
	                options: {
	                    sourceMap: true,
	                    syntax: postCssScss,
	                    plugins: () => [
	                        autoprefixer({flexbox: true})
	                    ],
	                },
	            }
			]
		},
		{
			test: /.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)(\?[a-z0-9=\.]+)?$/,
			use: [
			{
				loader: 'file-loader',
				options: {
					name: 'css/[path][name].[ext]'
				}
			}
			]
		},
		]
	},
	"plugins": [new MiniCssExtractPlugin({
		"filename": "css/theme.css"
	})]
}
