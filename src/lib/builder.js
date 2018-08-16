"use strict";
const webpackPackBuilder = require("../webpack-react");

function getWebpackBuilder() {
	return webpackPackBuilder;
}
function build(config, option = {}) {
	const builder = getWebpackBuilder(config);
	const build = () => {
		const webpackConfigList = builder.getWebpackConfig(config, option);
		builder.build(webpackConfigList, config);
	};
	return build();
}

module.exports = {
	build,
	getWebpackBuilder
};
