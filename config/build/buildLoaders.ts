import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { ModuleOptions } from "webpack";
import { BuildOptions } from "./types/types";

export function buildLoaders(options: BuildOptions): ModuleOptions["rules"] {
	const isDev = options.mode === "development";
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
		use: [isDev ? "style-loader" : MiniCssExtractPlugin.loader, cssLoaderModules, 'sass-loader']
	}

	const tsLoader = {
		// ts-loader умеет работать с JSX
		//без него нужен babel-loader
		test: /\.tsx?$/,
		use: 'ts-loader',
		exclude: /node_modules/,
	}
	return [scssLoader, tsLoader]
}