// @ts-check
const path = require("path");
const debug = require("debug")("topfeed");
const merge = require("webpack-merge");
function getWebpackConfig({ buildEnv, buildTarget, config, configureWebpack }) {
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
		const userConfWebpack = configureWebpack ? configureWebpack({   //topfeed中的配置
			buildEnv,
			buildTarget: target
		}) : null;
		// 提取用户配置的webpack中的Plugin
		const userConfWebpackPlugins = userConfWebpack && userConfWebpack.plugins ? userConfWebpack.plugins: null;
		if(userConfWebpackPlugins){
			delete userConfWebpack.plugins;
		}
		// 合并rules
		const mergeWebpackRules = merge.smart( 
			baseConfig(config),
			userConfWebpack
		);
		// 合并plugins
		let pluginsNameArr = [];
		if(userConfWebpackPlugins){
			pluginsNameArr = userConfWebpackPlugins.map(obj => obj.constructor ? obj.constructor.name : undefined)
													.filter(d => d !== undefined);
		}
		const mergeConfig = merge({
			// mergePlugins
			customizeArray: merge.unique(
			  'plugins',
			  pluginsNameArr,
			  plugin => plugin.constructor && plugin.constructor.name
			)
		  })(mergeWebpackRules,
			userConfWebpack
			)
		debug(`${target} config: %O`, mergeConfig);
		return mergeConfig;
	};
	return webpackTarget.map(target => getConfig(target));
}

module.exports = getWebpackConfig;
