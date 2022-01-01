const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const baseConfig = require('./webpack.common.js');

const plugins = [
	new HtmlWebpackPlugin({
		filename: 'index.html',
		title: 'React Design Editor',
		meta: {
			description: `React Design Editor has started to developed direct manipulation of editable design tools like Powerpoint, We've developed it with react.js, ant.design, fabric.js`,
		},
	}),
	new WorkboxPlugin.GenerateSW({
		skipWaiting: true,
		clientsClaim: true,
		swDest: 'sw.js',
	}),
];
module.exports = merge(baseConfig, {
	mode: 'production',
	entry: {
		app: ['core-js/stable', path.resolve(__dirname, 'src/index.tsx')],
	},
	output: {
		path: path.resolve(__dirname, 'docs'),
		publicPath: './',
		filename: 'js/[name].[chunkhash:16].js',
		chunkFilename: 'js/[id].[chunkhash:16].js',
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				parallel: true,
				terserOptions: {
					warnings: false,
					compress: {},
					ecma: 6,
					mangle: true,
				},
			}),
		],
	},
	plugins,
});
