// @ts-check
"use strict";
const yargs = require("yargs");
const fs = require("fs");
const fse = require("fs-extra");
const urllib = require("urllib");
const assert = require("assert");
const inquirer = require("inquirer");
const groupBy = require("group-object");
const path = require("path");
const os = require("os");
const rimraf = require("mz-modules/rimraf");
const compressing = require("compressing");
const mkdirp = require("mkdirp");
require("colors");
module.exports = class Command {
	constructor(options = {}) {
		this.name = options.name || "topfeed-init";
		this.configName = options.configName = "topfeed-init-config";
		this.httpClient = urllib.create();
		this.boilerplatMapping = {
			simple: {
				name: "simple",
				package: "topfeed-boilerplate-simple",
				description: "simple topfeed app boilerplate"
			},
			empty: {
				name: "empty",
				package: "topfeed-boilerplate-complex",
				description: "empty topfeed boilerplate"
			}
		};
	}
	async run(cwd, args) {
		const argv = (this.argv = this.getParser().parse(args || []));
		this.cwd = cwd;
		this.registyUrl = this.getRegistryByType(this.argv.registry);
		this.log(`use registry: ${this.registyUrl}`);
		this.targetDir = await this.getTargetDir();
		let templateDir = await this.getTemplateDir();
		if (!templateDir) {
			let pkgName = this.argv.package;
			if (!pkgName) {
				let boilerplate;
				if (argv.type && this.boilerplatMapping[argv.type]) {
					boilerplate = this.boilerplatMapping[argv.type];
				} else {
					boilerplate = await this.askForBoilerPlateType(
						this.boilerplatMapping
					);
				}
				this.log(
					`use boilerplate: ${boilerplate.name}(${boilerplate.package})`
				);
				pkgName = boilerplate.package;
			}
			templateDir = await this.downloadBoilerplate(pkgName);
		}
		await this.processFiles(this.targetDir, templateDir);
		this.printUsage(this.targetDir);
	}
	printUsage() {
		this.log(
			`usage:\n- cd ${
				this.targetDir
			}\n- npm install\n- npm start / npm run dev / npm test`
		);
	}
	async processFiles(targetDir, templateDir) {
		const src = path.join(templateDir);
		return new Promise((resolve, reject) => {
			fse.copy(src, targetDir, (err, createdFiles) => {
				if (err) {
					reject(err);
				} else {
					resolve(createdFiles);
				}
			});
		});
	}
	async getTargetDir() {
		const dir = this.argv._[0] || this.argv.dir || "";
		let targetDir = path.resolve(this.cwd, dir);
		const force = this.argv.force;
		const validate = dir => {
			if (!fs.existsSync(dir)) {
				mkdirp.sync(dir);
				return true;
			}
			if (!fs.statSync(dir).isDirectory()) {
				return `${dir} already exists as a file`.red;
			}
			const files = fs.readdirSync(dir).filter(name => name[0] !== ".");
			if (files.length > 0) {
				if (force) {
					this.log(`${dir} exists and will be overriten due to --force`.red);
					return true;
				}
				return `${dir} exists and not empty: ${JSON.stringify(files)}`.red;
			}
			return true;
		};
		const isValid = validate(targetDir);
		if (isValid !== true) {
			this.log(isValid);
			const answer = await inquirer.prompt({
				name: "dir",
				message: "Please enter target dir: ",
				default: dir || ".",
				filter: dir => path.resolve(this.cwd, dir),
				validate
			});
			targetDir = answer.dir;
		}
		this.log(`target dir is ${targetDir}`);
		return targetDir;
	}
	async askForBoilerPlateType(mapping) {
		const groupMapping = groupBy(
			mapping,
			(acc, value) => value.category || "other"
		);
		const groupNames = Object.keys(groupMapping);
		const group = groupMapping[groupNames[0]];
		const choices = Object.keys(group).map(key => {
			const item = group[key];
			return {
				name: `${key} - ${item.description}`,
				value: item
			};
		});
		choices.unshift(new inquirer.Separator());
		const answers = await inquirer.prompt({
			name: "type",
			type: "list",
			message: "Please select a boilerplate type",
			choices,
			pageSize: choices.length
		});
		return answers.type;
	}
	getRegistryByType(key) {
		switch (key) {
			case "npm":
				return "https://registry.npmjs.org";
			default:
				if (/https?:/.test(key)) {
					return key.replace(/\/$/, ""); // 去除末尾的slash防止拼接url错误
				} else {
					let url =
						process.env.npm_registry ||
						process.env.npm_config_registry ||
						"https://registry.npmjs.org";
					return url.replace(/\/$/, "");
				}
		}
	}
	async downloadBoilerplate(pkgName) {
		const result = await this.getPackageInfo(pkgName);
		const tgzUrl = result.dist.tarball;
		const saveDir = path.join(os.tmpdir(), "topfeed-init-boilerplate");
		await rimraf(saveDir);
		this.log(`downloading ${tgzUrl}`);
		const response = await this.curl(tgzUrl, {
			streaming: true,
			followRedirect: true
		});
		await compressing.tgz.uncompress(response.res, saveDir);
		this.log(`extract to ${saveDir}`);
		return path.join(saveDir, "/package");
	}
	async getPackageInfo(pkgName) {
		this.log(`fetching npm info of ${pkgName}`);
		try {
			const result = await this.curl(`${this.registyUrl}/${pkgName}/latest`, {
				dataType: "json",
				followRedirect: true
			});
			assert(
				result.status === 200,
				`npm info ${pkgName} get error: ${result.status}, ${result.data.reason}`
			);
			return result.data;
		} catch (err) {
			throw err;
		}
	}
	async curl(url, options) {
		return await this.httpClient.request(url, options);
	}
	getTemplateDir() {
		let templateDir;
		// 本地template `topfeed-init --template=PATH`
		if (this.argv.template) {
			templateDir = path.resolve(this.cwd, this.argv.template);
			if (!fs.existsSync(templateDir)) {
				this.log(`${templateDir} should contain bolerplater folder`.red);
			} else {
				this.log(`local template dir is ${templateDir}`);
			}
		}
	}
	log(...args) {
		args[0] = `[${this.name}] `.blue + args[0];
		console.log(...args); // eslint-disable-line
	}
	getParser() {
		return yargs
			.usage(
				"init topfeed project from boilerplate\nUsage: $0 [dir] --type=simple"
			)
			.options(this.getParserOptions())
			.alias("h", "help")
			.version()
			.help();
	}
	getParserOptions() {
		return {
			type: {
				type: "string",
				description: "boilerplate type"
			},
			package: {
				type: "string",
				description: "boilerplate package name"
			},
			registry: {
				type: "string",
				description: "npm registry",
				alias: "r"
			},
			dir: {
				type: "string",
				description: "target directory"
			},
			force: {
				type: "boolean",
				description: "force to override directory"
			}
		};
	}
};
