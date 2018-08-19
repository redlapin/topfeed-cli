const baseConfig = require("./webpack.config.node");
const merge = require("webpack-merge");
const webpack = require("webpack");
const cleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const ssrConfig = config =>
	merge(baseConfig(config), {
		output: {
			path: config.outputPath,
			filename: "[name].js",
			libraryTarget: "commonjs2"
		},
		externals: [nodeExternals()],
		plugins: [
			new ExtractTextPlugin({
				filename: "[name].css",
				allChunks: true
			}),
			new webpack.optimize.LimitChunkCountPlugin({
				maxChunks: 1
			}), // ssr 情况下禁止前端拆包
			new cleanWebpackPlugin(config.outputPath),
			new webpack.DefinePlugin({
				__NODE__: true,
				__BROWSER__: false
			})
		],
		target: "node",
		node: {
			__filename: true,
			__dirname: true
		}
	});

module.exports = ssrConfig;
