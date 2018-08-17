// @ts-check
const path = require("path");
module.exports = {
	outputPath: path.resolve(__dirname, "dist"),
	configureWebpack: {
		context: path.resolve(__dirname),
		entry: "./src",
		output: {
			path: path.resolve(__dirname, "dist"),
			publicPath: "/static/"
		}
	}
};
