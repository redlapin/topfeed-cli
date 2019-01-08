// @ts-check
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");
const getEntry = require("../../get_entry");
const root = process.cwd();
const entry = getEntry(root);
module.exports = config => ({
	context: path.resolve(root),
	entry,
	mode: "development",
	output: {
		publicPath: config.publicPath,
		path: path.join(root, "server/public")
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
				test: /\.(scss)$/,
				loader: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: ["css-loader", "sass-loader", "resolve-url-loader"]
				})
			},
			{
				test: /\.md$/,
				use: ["raw-loader"]
			},

			{
				test: /\.(png|svg|jpg|gif|jpeg)$/,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 10000
						}
					}
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: ["file-loader"]
			}
		]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: "[name].css",
			allChunks: true
		})
	],
	resolve: {
		extensions: [".tsx", ".ts", ".js", ".jsx", ".json"]
	}
});
