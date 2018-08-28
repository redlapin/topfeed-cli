#!/usr/bin/env node

const commander = require("commander");
const pkg = require("../package.json");

commander
	.version(pkg.version)
	.usage("<command> [options]")
	.command("build", "build project")
	.command("dev", "dev")
	.command("init", "init project")
	.command("i18n", "download i18n translations")
	.command("font", "build and preview font")
	.command("scm", "generate scm setting for you")
	.parse(process.argv);
