const webpack = require('webpack');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const pkg = require('./package.json');

module.exports = {
	mode: 'production',
	entry: {
		[pkg.name]: ['core-js/stable', path.resolve(__dirname, 'src/canvas/index.tsx')],
		[`${pkg.name}.min`]: ['core-js/stable', path.resolve(__dirname, 'src/canvas/index.tsx')],
	},
	externals: {
		react: 'react',
		'react-dom': 'react-dom',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
		library: `${pkg.name}.js`,
		libraryTarget: 'umd',
		umdNamedDefine: true,
		publicPath: './',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx|tsx|ts)$/,
				loader: 'babel-loader',
				include: path.resolve(__dirname, 'src'),
				options: {
					cacheDirectory: true,
					presets: [
						[
							'@babel/preset-env',
							{
								modules: false,
								useBuiltIns: 'usage',
								corejs: 3,
								targets: { browsers: ['last 5 versions', 'ie >= 11'], node: 'current' },
							},
						],
						'@babel/preset-react',
						[
							'@babel/preset-typescript',
							{
								isTSX: true,
								allExtensions: true,
								allowDeclareFields: true,
							},
						],
					],
					plugins: [
						'@babel/plugin-transform-runtime',
						['@babel/plugin-transform-typescript', { allowDeclareFields: true }],
						['@babel/plugin-proposal-class-properties', { loose: true }],
						['@babel/plugin-proposal-private-methods', { loose: true }],
						['@babel/plugin-proposal-decorators', { legacy: true }],
						['@babel/plugin-proposal-private-property-in-object', { loose: true }],
						'@babel/plugin-syntax-dynamic-import',
						'@babel/plugin-syntax-async-generators',
						'@babel/plugin-proposal-object-rest-spread',
						'dynamic-import-webpack',
					],
				},
				exclude: /node_modules/,
			},
			{
				test: /\.(css|less)$/,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'less-loader',
						options: { javascriptEnabled: true },
					},
				],
			},
			{
				test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				type: 'asset/resource',
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', 'jsx'],
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
};
