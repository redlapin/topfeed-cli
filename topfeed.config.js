// @ts-check
const path = require("path");
module.exports = {
	port: 4001,
	outputPath: path.resolve(__dirname, "dist"),
	configureWebpack: ({ buildTarget }) => {
		return {
			context: path.resolve(__dirname),
			entry: "./src",
			output: {
				path: path.resolve(__dirname, `dist/${buildTarget}`),
				publicPath: "/static/"
			}
		};
	}
};
