const fs = require("fs");
const path = require("path");
module.exports = root => {
	const filePath = path.resolve(root, "client/entry");
	const pages = fs
		.readdirSync(filePath)
		.filter(file => fs.statSync(path.resolve(filePath, file)).isDirectory());
	const entries = {};
	for (const entry of pages) {
		entries[entry] = [path.join(filePath, entry)];
	}
	return entries;
};
