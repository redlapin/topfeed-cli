const merge = require("webpack-merge");
const baseConfig = require("./webpack.config.browser");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = config =>
	merge(baseConfig(config), {
		mode: "production",
		output: {
			filename: "[name].[chunkhash:8].js",
			chunkFilename: "chunk.[name].[chunkhash:8].js"
		},
		plugins: [
			new ExtractTextPlugin({
				filename: "[name].[md5:contenthash:hex:20].css",
				allChunks: true
			})
		]
	});
