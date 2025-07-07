import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

type Node = 'production' | 'development'

interface EnvVars {
	mode: Node,
	port: number
}

export default (env: EnvVars) => {
	const isDev = env.mode === "development"
	const config: webpack.Configuration = {
		mode: env.mode ?? "development",
		entry: path.resolve(__dirname, "src", "index.tsx"),
		output: {
			path: path.resolve(__dirname, "build"),
			// contenthash для избегания проблем с хешированием в браузере
			filename: '[name].[contenthash].js',
			clean: true,
		},
		plugins: [
			new HtmlWebpackPlugin({ template: path.resolve(__dirname, "public", "index.html") }),
			new MiniCssExtractPlugin({
				filename: 'css/[name].[contenthash:8].css',
				chunkFilename: 'css/[name].[contenthash:8].css'
			})
		],
		module: {
			rules: [
				{
					test: /\.s[ac]ss$/i,
					use: [MiniCssExtractPlugin.loader, "css-loader", 'sass-loader']
				},
				{
					// ts-loader умеет работать с JSX
					//без него нужен babel-loader
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/,
				},
			],
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js']
		},
		devtool: isDev && 'inline-source-map',
		devServer: isDev ? {
			port: env.port ?? 3000,
			open: true
		} : undefined
	}
	return config;
}