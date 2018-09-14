#!/usr/bin/env node

"use strict";
const commander = require("commander");
const Util = require("../lib/util");
const download = require("../lib/i18n");
const defaultConfig = require("../lib/default.config").i18n;
const customConfig = Util.getConfigFile().i18n;
const config = Object.assign({}, defaultConfig, customConfig);
commander
	.command("download")
	.description("download translations")
	.action(function() {
		download(config);
	});
commander.parse(process.argv);
