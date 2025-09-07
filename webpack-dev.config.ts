import path from 'path'
import { fileURLToPath } from 'url'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import 'webpack-dev-server'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const config: webpack.Configuration = {
	mode: 'development',
	target: 'web',
	entry: { main: './src/index.tsx' },
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[contenthash].js',
		clean: true,
	},
	devServer: {
		static: {
			directory: path.resolve(__dirname, 'public'),
		},
		hot: true,
		port: 3005,
	},
	module: {
		rules: [
			{
				test: /\.ts(x)?$/,
				loader: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.css/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		alias: {
			components: path.resolve(__dirname, 'src/components'),
		},
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'public', 'index.html'),
		}),
	],
}

export default config
