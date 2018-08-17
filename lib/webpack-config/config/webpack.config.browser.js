const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.config.base");
const { ReactLoadablePlugin } = require("react-loadable/webpack");
const ManifestPlugin = require("webpack-manifest-plugin");
module.exports = config =>
	merge(baseConfig(config), {
		output: {
			path: config.outputPath
		},
		plugins: [
			new ManifestPlugin(),
			new webpack.DefinePlugin({
				__BROWSER__: true,
				__NODE__: false
			}),
			new ReactLoadablePlugin({
				filename: path.resolve(config.outputPath, "react-loadable.json")
			})
		]
	});
