#!/usr/bin/env node

"use strict";
const commander = require("commander");
const Util = require("../lib/util");
const download = require("../lib/i18n");

const defaultConfig = require("../lib/default.config").poly;
const customConfig = Util.getConfigFile(config.config).poly;
const config = Object.assign({}, defaultConfig, customConfig);
commander
	.command("download")
	.description("build font")
	.action(function build() {
		console.log("generate:");
		download(config);
	});
