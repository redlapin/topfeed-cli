// @ts-check
const path = require("path");
const debug = require("debug")("topfeed");
const merge = require("webpack-merge");
function getWebpackConfig({ buildEnv, buildTarget, config, configureWebpack }) {
	console.log("options:", buildEnv, buildTarget);
	buildEnv = buildEnv === "development" ? "dev" : "prod";
	let webpackTarget = [];
	if (buildTarget === "ssr") {
		webpackTarget = ["node", "browser"];
	} else {
		webpackTarget = [buildTarget];
	}
	const getConfig = target => {
		const baseConfigPath = `webpack.config.${target}.${buildEnv}.js`;
		const baseConfig = require(path.join(__dirname, "config", baseConfigPath));
		const mergeConfig = merge(
			baseConfig(config),
			configureWebpack({
				buildEnv,
				buildTarget: target
			})
		);
		debug("webpack:", mergeConfig);
		return mergeConfig;
	};
	return webpackTarget.map(target => getConfig(target));
}

module.exports = getWebpackConfig;
