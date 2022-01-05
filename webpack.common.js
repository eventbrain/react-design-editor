const path = require('path');

module.exports = {
	module: {
		rules: [
			{
				test: /\.(js|jsx|tsx|ts)$/,
				include: path.resolve(__dirname, 'src'),
				exclude: /node_modules/,
				use: {
					loader: 'ts-loader',
					options: {
						transpileOnly: true,
					},
				},
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
			{
				test: /\.(js|jsx|tsx|ts)?$/,
				include: /node_modules/,
				use: ['react-hot-loader/webpack'],
			},
		],
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /node_modules/,
					chunks: 'initial',
					name: 'vendor',
					enforce: true,
				},
			},
		},
		emitOnErrors: true,
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', 'jsx'],
	},
};
