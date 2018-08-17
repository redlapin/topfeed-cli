const baseConfig = require("./webpack.config.browser");
const merge = require("webpack-merge");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");
module.exports = config => {
	return merge(baseConfig(config), {
		mode: "development",
		devtool: "source-map",
		devServer: {
			host: "0.0.0.0",
			hot: false,
			inline: false,
			port: 4001,
			disableHostCheck: true,
			historyApiFallback: true
		},
		plugins: [
			new ExtractTextPlugin({
				filename: "[name].css",
				allChunks: true
			}),
			new WriteFilePlugin()
		]
	});
};
