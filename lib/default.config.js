/**
 * topfeed 默认配置
 */
// @ts-check
const path = require("path");
const root = process.cwd();
module.exports = {
	port: 4001,
	outputPath: path.resolve(root, "dist"),
	configureWebpack: {
		context: path.resolve(root),
		entry: "./src",
		output: {
			path: path.resolve(__dirname, "dist"),
			publicPath: "/static/"
		}
	}
};
