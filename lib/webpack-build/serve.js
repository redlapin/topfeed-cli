const webpackServe = require("webpack-serve");
const buildConfig = require("../webpack-config");
function serve({ buildEnv, buildTarget, config }) {
	console.log("config:", config);
	const webpackConfig = buildConfig({
		buildEnv,
		buildTarget,
		configureWebpack: config.configureWebpack,
		config
	});
	const argv = {};
	webpackServe(argv, {
		open: true,
		port: config.port,
		config: webpackConfig,
		devMiddleware: {
			publicPath: "/static/"
		}
	});
}
module.exports = serve;
