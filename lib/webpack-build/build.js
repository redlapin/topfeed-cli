// @ts-check
const webpack = require("webpack");
const buildConfig = require("../webpack-config");
function build({ buildEnv, buildTarget, config }, callback) {
	const webpackConfig = buildConfig({
		buildEnv,
		buildTarget,
		configureWebpack: config.configureWebpack,
		config
	});
	webpack(webpackConfig, function cb(err, stats) {
		return callback && callback(err, stats);
	});
}
module.exports = build;
