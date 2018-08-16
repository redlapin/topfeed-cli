/**
 * 用户自定义webpack配置
 * @param {} program
 */
function initWebpackConfig(program) {
	const filename = program.filename;
	const config = require(filename);
	return config;
}

module.exports = {
	initWebpackConfig
};
