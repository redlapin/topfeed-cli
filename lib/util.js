const path = require("path");
const { join } = require("path");
const { existsSync } = require("fs");
const CONSTANT = require("./constant");
function getConfigFile(config) {
	const configFilePath = path.resolve(
		process.cwd(),
		config || `./${CONSTANT.DEFAULT_CONFIG_FILE_NAME}`
	);
	return require(configFilePath);
}
function bootStrapFile() {
	const absSrcPath = path.resolve(process.cwd(), "client");
	const globalFiles = [
		join(absSrcPath, "bootstrap.tsx"),
		join(absSrcPath, "bootstrap.ts"),
		join(absSrcPath, "bootstrap.jsx"),
		join(absSrcPath, "bootstrap.js")
	];
	const ret = globalFiles.filter(f => existsSync(f))[0];
	return ret;
}

module.exports = {
	getConfigFile,
	bootStrapFile
};
