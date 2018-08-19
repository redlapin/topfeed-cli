#!/usr/bin/env node
"use strict";
// @ts-check
const commander = require("commander");
const ora = require("ora");
const path = require("path");
const chalk = require("chalk");
const defaultConfig = require("../lib/default.config");
const logger = require("../lib/logger");
const buildTool = require("../lib/webpack-build");
const CONSTANT = require("../lib/constant");

commander
	.usage("[options]")
	.option(
		"-c, --config <path>",
		`set topfeed's config file [default: ./${
			CONSTANT.DEFAULT_CONFIG_FILE_NAME
		}]`
	)
	.option("-e, --env <env>", "development | production")
	.option("-t, --target <target>", "browser|node|ssr")
	.parse(process.argv);
const configFilePath = path.resolve(
	process.cwd(),
	commander.config || `./${CONSTANT.DEFAULT_CONFIG_FILE_NAME}`
);
const config = Object.assign(defaultConfig, require(configFilePath));
const buildEnv = commander.env || CONSTANT.DEFAULT_ENV;
const buildTarget = commander.target || CONSTANT.DEFAULT_TARGET;
process.env.NODE_ENV = buildEnv;
process.env.TARGET = buildTarget;

logger.log(
	`build env: ${chalk.blue(buildEnv)}, build target: ${chalk.blue(buildTarget)}`
);
const spinner = ora("topfeed build started\n").start();

buildTool.build(
	{
		config,
		buildEnv,
		buildTarget
	},
	(err, stats) => {
		if (err) {
			spinner.fail("topfeed build failed.");
			logger.fatal(err);
			return;
		}
		if (stats.hasErrors()) {
			spinner.fail("topfeed build failed");
			logger.fatal(
				stats.toString({
					moudles: false,
					chunks: false,
					children: true,
					colors: true
				})
			);
			return;
		}
		logger.normal();
		spinner.succeed("topfeed build succeed");
		logger.normal(
			stats.toString({
				moudles: false,
				chunks: false,
				children: false,
				colors: false
			})
		);
	}
);
