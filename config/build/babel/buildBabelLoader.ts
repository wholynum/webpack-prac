import {removeDataTestIdPlugin} from "./removeDataTestIdPlugin";

export function buildBabelLoader(isDev: boolean) {
    return {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
                presets: [
                    "@babel/preset-env",
                    ["@babel/preset-react", {
                        runtime: isDev ? "automatic" : "classic",
                    }],
                    "@babel/preset-typescript"
                ],
                //переделать, чтобы не передавать пустой массив
                plugins: [
                    !isDev ? [
                        removeDataTestIdPlugin,
                        {
                            props: ["data-testid"]
                        }
                    ] : {}
                ]
            }
        }
    }
}