var keystone = require('keystone'),
  Types = keystone.Field.Types;

/**
 * NewsCategory Model
 * ==================
 */

var NewsCategory = new keystone.List('NewsCategory', {
  autokey: { from: 'name', path: 'key', unique: true }
});

NewsCategory.add({
  name: { type: String, required: true }
});

NewsCategory.relationship({ ref: 'News', path: 'categories' });

NewsCategory.register();
