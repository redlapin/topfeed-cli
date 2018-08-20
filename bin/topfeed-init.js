#!/usr/bin/env node

"use strict";

const process = require("process");
const Command = require("../lib/commander");

(async function init() {
	try {
		await new Command().run(process.cwd(), process.argv.slice(2));
	} catch (err) {
		console.log(err.stack); // eslint-disable-line
		process.exit(1);
	}
})();
