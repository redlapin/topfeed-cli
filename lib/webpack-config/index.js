// @ts-check
const path = require("path");
const debug = require("debug")("topfeed");
const merge = require("webpack-merge");
function getWebpackConfig({
	buildEnv,
	buildTarget,
	config,
	configureWebpack = {}
}) {
	console.log("options:", buildEnv, buildTarget);
	buildEnv = buildEnv === "development" ? "dev" : "prod";
	const baseConfigPath = `webpack.config.${buildTarget}.${buildEnv}.js`;
	const baseConfig = require(path.join(__dirname, "config", baseConfigPath));
	const mergeConfig = merge(baseConfig(config), configureWebpack);
	debug("webpack:", mergeConfig);
	return mergeConfig;
}

module.exports = getWebpackConfig;
