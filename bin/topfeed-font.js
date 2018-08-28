#!/usr/bin/env node
"use strict";
const generateFont = require("icon2font");
const path = require("path");
const Util = require("../lib/util");
const opener = require("opener");

const commander = require("commander");
const defaultConfig = require("../lib/default.config").font;
const customConfig = Util.getConfigFile(commander.config).font;
const config = Object.assign({}, defaultConfig, customConfig);

commander
	.command("build")
	.description("build font")
	.action(function build() {
		console.log("generate:");
		generateFont(config.input, config.output, config.fontName);
	});

commander
	.command("view")
	.description("view generate font")
	.action(function view() {
		console.log("view");
		opener(path.resolve(config.output, "index.html"));
	});
commander.parse(process.argv);
