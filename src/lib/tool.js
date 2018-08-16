"use strict";
const webpack = require("webpack");

class webpackTool {
	constructor(config) {
		this.config = config;
	}
	build(webpackConfig) {
		const webpackConfigList = [].concat(webpackConfig);
		const compiler = webpack(webpackConfigList);
		return compiler;
	}
}

module.exports = webpackTool;
