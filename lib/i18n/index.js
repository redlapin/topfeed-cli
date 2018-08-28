// @ts-check

const download = require("download");
const path = require("path");
const fs = require("fs");
const ora = require("ora");
require("colors");
/**
 *
 * @param {*} param0
 * url: 文案下载地址
 * draft: 草稿文案还是正式文案
 * output: 文案下载地址
 */
function downi18n({ project, url, draft, output, whitelist }) {
	const POLY_URL = "https://poly.bytedance.net/api/trans/download?";
	if (!project && !url) {
		console.log("Please set project id or i18n_url".red);
		process.exit(1);
	}
	if (!url && project) {
		url =
			POLY_URL +
			(draft ? "" : "publish=1&") +
			(project ? "project_id=" + project : "");
	}

	const options = {
		extract: true,
		out: output,
		strip: 1
	};
	const spinner = ora(
		`Downloading i18n text from ${url}.red ..., save path is ${
			path.resolve(output).yellow
		}`
	);
	spinner.start();
	spinner.color = "yellow";
	download(url, output, options)
		.then(() => {
			spinner.succeed();
			// 删除无用文件
			const dirs = fs.readdirSync(output);
			if (!dirs.length) {
				console.log("i18n text do not exist in this project".red);
			}
			console.log("i18n text file list:".green, dirs.join(" "));
			const validReg = /^[a-z]+(-[a-z]+)?\.json$/;
			const support_langs = [];
			for (const name of dirs) {
				if (!validReg.test(name)) {
					console.log("invalid file name:".red, name);
					fs.unlinkSync(path.join(output, name));
				} else {
					const locale = name.split(".")[0];
					if (whitelist && !whitelist.includes(locale)) {
						fs.unlinkSync(path.join(output, name));
					}
					support_langs.push(name.split(".")[0]);
				}
			}
		})
		.catch(err => {
			console.log("error:", err);
			spinner.fail();
		});
}

module.exports = downi18n;
