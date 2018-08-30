// @ts-check
const path = require("path");
const debug = require("debug")("topfeed");
const merge = require("webpack-merge");
function getWebpackConfig({
	buildEnv,
	buildTarget,
	config,
	configureWebpack = () => {}
}) {
	buildEnv = buildEnv === "development" ? "dev" : "prod";
	let webpackTarget = [];
	if (buildTarget === "ssr") {
		webpackTarget = ["browser", "node"];
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
		debug(`${target} config: %O`, mergeConfig);
		return mergeConfig;
	};
	return webpackTarget.map(target => getConfig(target));
}

module.exports = getWebpackConfig;
