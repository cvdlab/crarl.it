var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * ProjectCategory Model
 * ==================
 */

var ProjectCategory = new keystone.List('ProjectCategory', {
	autokey: { from: 'name', path: 'key', unique: true }
});

ProjectCategory.add({
	name: { type: Types.Text, required: true }
});

ProjectCategory.relationship({ ref: 'Project', path: 'categories' });

ProjectCategory.register();
