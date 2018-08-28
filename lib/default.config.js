// @ts-check
/**
 * topfeed 默认配置
 */
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
	},
	font: {
		input: path.resolve(root, "client/assets/svg"),
		output: path.resolve(root, "client/assets/font"),
		fontName: "i18nfont"
	},
	i18n: {
		project: "1",
		output: path.resolve(root, "server/locales/langs"),
		draft: false,
		whitelist: ["ko", "ja"]
	}
};
