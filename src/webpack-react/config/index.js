const devConfig = require("./webpack.config.dev");
const prodConfig = require("./webpack.config.prod.js");
const ssrConfig = require("./webpack.config.ssr");
function getWebpackConfig({ env }) {
	if (env === "ssr") {
		return ssrConfig;
	} else if (env == "prod") {
		return prodConfig;
	} else if (env === "dev") {
		return devConfig;
	} else {
		return {
			devConfig,
			prodConfig,
			ssrConfig
		};
	}
}

module.exports = {
	getWebpackConfig
};
