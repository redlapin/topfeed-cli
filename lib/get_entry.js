const fs = require("fs");
const path = require("path");
const util = require("./util");
module.exports = root => {
	const filePath = path.resolve(root, "client/entry");
	const pages = fs
		.readdirSync(filePath)
		.filter(file => fs.statSync(path.resolve(filePath, file)).isDirectory());
	const entries = {};
	const bootstrap = util.bootStrapFile();
	for (const entry of pages) {
		entries[entry] = [path.join(filePath, entry)];
		if (bootstrap) {
			entries[entry].unshift(bootstrap);
		}
	}
	return entries;
};
