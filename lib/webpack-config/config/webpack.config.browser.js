const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const { ReactLoadablePlugin } = require("react-loadable/webpack");
const baseConfig = require("./webpack.config.base");
const ManifestPlugin = require("webpack-manifest-plugin");

module.exports = config => merge.smart(baseConfig(config), {
		module: {
			rules: [
				{
					test: /.(jsx?|tsx?)$/,
					use: [
						{
							loader: "babel-loader",
							options: {
								envName: "browser"
							}
						}
					],
					exclude: /node_modules/
				}
			]
		},
		output: {
			path: path.join(config.outputPath, "browser")
		},
		plugins: [
			new ManifestPlugin(),
			new ReactLoadablePlugin({
				filename: path.resolve(config.outputPath, "browser/react-loadable.json")
			}),
			new webpack.DefinePlugin({
				__BROWSER__: true,
				__NODE__: false
			})
		]
	});
