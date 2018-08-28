const path = require("path");
const CONSTANT = require("./constant");
function getConfigFile(config) {
	const configFilePath = path.resolve(
		process.cwd(),
		config || `./${CONSTANT.DEFAULT_CONFIG_FILE_NAME}`
	);
	return require(configFilePath);
}

module.exports = {
	getConfigFile
};
