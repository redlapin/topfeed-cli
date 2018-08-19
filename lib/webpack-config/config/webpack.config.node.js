const path = require("path");
const baseConfig = require("./webpack.config.base");
const merge = require("webpack-merge");
module.exports = config =>
	merge(baseConfig(config), {
		output: {
			path: path.join(config.outputPath, "node")
		},
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
