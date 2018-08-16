const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
	mode: "development",
	devtool: "source-map",
	context: __dirname,
	output: {
		path: path.resolve(__dirname, "../dist/client"),
		filename: "[name].js",
		chunkFilename: "chunk.[name].js"
	},
	module: {
		rules: [
			{
				test: /.(jsx?|tsx?)$/,
				use: ["babel-loader"],
				exclude: /node_modules/
			},
			{
				test: /\.(less|css)$/,
				loader: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: ["css-loader", "less-loader"]
				})
			},
			{
				test: /\.md$/,
				use: ["raw-loader"]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: ["file-loader"]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: ["file-loader"]
			}
		]
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js", ".jsx", ".json"],
		alias: {
			style: path.resolve(__dirname, "style")
		}
	}
};
