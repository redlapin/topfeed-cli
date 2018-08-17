"use strict";

let chalk = require("chalk");
let format = require("util").format;

let prefix = "  topfeed-cli";
let sep = chalk.gray("·");

function handleErrorMsg(message, ...rest) {
	if (message instanceof Error) {
		message = message.message.trim();
	}
	let msg = format.apply(format, [message, ...rest]);

	console.error(chalk.red(prefix), sep, msg);
}

exports.normal = function normal() {
	let msg = format.apply(format, arguments);

	console.log(msg);
};

exports.warn = function warn() {
	let msg = format.apply(format, arguments);

	console.log(chalk.yellow(prefix), sep, msg);
};

exports.log = function log() {
	let msg = format.apply(format, arguments);

	console.log(chalk.white(prefix), sep, msg);
};

exports.success = function success() {
	let msg = format.apply(format, arguments);

	console.log(chalk.green(prefix), sep, msg);
};

exports.error = function error(...args) {
	handleErrorMsg(...args);
};

exports.fatal = function fatal(...args) {
	handleErrorMsg(...args);
	process.exit(-1);
};
