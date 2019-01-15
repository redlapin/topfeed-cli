const path = require("path");
const baseConfig = require("./webpack.config.base");
const merge = require("webpack-merge");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const WriteFilePlugin = require("write-file-webpack-plugin");
const nodeConfig = config =>
	merge.smart(baseConfig(config), {
		mode: "development",
		output: {
			path: path.join(config.outputPath, "node"),
			filename: "[name].js",
			libraryTarget: "commonjs2"
		},
		module: {
			rules: [
				{
					test: /.(jsx?|tsx?)$/,
					use: [
						{
							loader: "babel-loader",
							options: {
								envName: "node"
							}
						}
					],
					exclude: /node_modules/
				}
			]
		},
		externals: [
			nodeExternals({
				whitelist: /\.css$/
			})
		],
		plugins: [
			new webpack.optimize.LimitChunkCountPlugin({
				maxChunks: 1
			}), // ssr 情况下禁止前端拆包
			new webpack.DefinePlugin({
				__NODE__: true,
				__BROWSER__: false
			}),
			new WriteFilePlugin()
		],
		target: "node",
		node: {
			__filename: true,
			__dirname: true
		}
	});

module.exports = nodeConfig;
