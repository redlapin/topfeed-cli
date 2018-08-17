const merge = require("webpack-merge");
const cleanWebpackPlugin = require("clean-webpack-plugin");
const baseConfig = require("./webpack.config.browser");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = config =>
	merge(baseConfig(config), {
		mode: "production",
		output: {
			filename: "[name].[chunkhash].js",
			chunkFilename: "chunk.[name].[chunkhash].js"
		},
		plugins: [
			new cleanWebpackPlugin("dist/client"),
			new ExtractTextPlugin({
				filename: "[name].[chunkhash].css",
				allChunks: true
			})
		]
	});
