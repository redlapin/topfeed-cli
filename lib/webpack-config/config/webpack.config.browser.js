const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.config.base");
const ManifestPlugin = require("webpack-manifest-plugin");
module.exports = config =>
	merge(baseConfig(config), {
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
			new webpack.DefinePlugin({
				__BROWSER__: true,
				__NODE__: false
			})
		]
	});
