#!/usr/bin/env node
"use strict";
const path = require("path");
const program = require("commander");
const utils = require("../src/utils");
const builder = require("../src/lib/builder");
const pkg = require(path.join(__dirname, "../package.json"));

program
	.version(pkg.version)
	.option("-b, --build [option]", "w(watch)")
	.description("init topfeed webpackconfig ");

program
	.command("build [env]")
	.description("webpack building")
	.action(env => {
		console.log("env:", env);
		const config = utils.initWebpackConfig(program);
		const option = utils.initOption(program, option, config);
		builder;
	});
