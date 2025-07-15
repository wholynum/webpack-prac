import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { ModuleOptions } from "webpack";
import { BuildOptions } from "./types/types";

export function buildLoaders(options: BuildOptions): ModuleOptions["rules"] {
	const isDev = options.mode === "development";

	const assetLoader = {
		test: /\.(png|jpg|jpeg|gif)$/i,
		type: 'asset/resource'
	}

	const svgr = {
		test: /\.svg$/i,
		use: [{
			loader: "@svgr/webpack",
			options: {
				icon: true,
				/* svgoConfig: {
					plugins: [
						{
							name: 'convertColors',
							params: {
								currentColor: true
							}
						}
					]
				} */
			}
		}],
	}

	const cssLoaderModules = {
		loader: "css-loader",
		options: {
			modules: {
				localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:8]"
			},

		}
	}

	const scssLoader = {
		test: /\.s[ac]ss$/i,
		use: [
			isDev ? "style-loader" : MiniCssExtractPlugin.loader, cssLoaderModules,
			{
				loader: "sass-loader",
				options: {
					api: "modern",
				},
			},
		],
	}

	const tsLoader = {
		// ts-loader умеет работать с JSX
		//без него нужен babel-loader
		test: /\.tsx?$/,
		use: [
			{
				loader: 'ts-loader',
				options: {
					transpileOnly: isDev
				}
			}
		],
		exclude: /node_modules/,
	}

	return [assetLoader, scssLoader, tsLoader, svgr]
}