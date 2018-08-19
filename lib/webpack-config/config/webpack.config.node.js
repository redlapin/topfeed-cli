const baseConfig = require("./webpack.config.base");
const merge = require("webpack-merge");
module.exports = config =>
	merge(baseConfig(config), {
		module: {
			rules: [
				{
					test: /.(jsx?|tsx?)$/,
					use: [
						{
							loader: "babel-loader",
							options: {
								envName: "browser"
							}
						}
					],
					exclude: /node_modules/
				}
			]
		}
	});
