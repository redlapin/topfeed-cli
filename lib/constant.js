module.exports = {
	ENV: {
		PRODUCTION: "production",
		DEVELOPMENT: "development"
	}, // 支持的ENV配置
	DEFAULT_ENV: "development", // 默认ENV配置
	TARGET: {
		BROWSER: "browser",
		NODE: "node"
	}, // 支持的TARGET配置
	DEFAULT_TARGET: "browser", // 默认的TARGET配置
	DEFAULT_CONFIG_FILE_NAME: "topfeed.config.js" //默认Topfeed配置文件
};
