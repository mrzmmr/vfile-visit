'use strict';

const vfile = require('vfile');
const clone = require('clone');

const visit = (file, fn = () => {}) => {
	const root = vfile(clone(file));

	const each = (file, index, parent) => {
		file = vfile(file);

		fn(file, index, parent);

		if (parent) {
			parent.contents[index] = file;
		}

		if (Array.isArray(file.contents)) {
			file.contents.forEach((sub, index) => {
				each(sub, index, file);
			});
		}
	};

	each(root);

	return root;
};

module.exports = visit;
