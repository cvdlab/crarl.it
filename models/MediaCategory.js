var keystone = require('keystone'),
  Types = keystone.Field.Types;

/**
 * MediaCategory Model
 * ==================
 */

var MediaCategory = new keystone.List('MediaCategory', {
  autokey: { from: 'name', path: 'key', unique: true }
});

MediaCategory.add({
  name: { type: String, required: true }
});

MediaCategory.relationship({ ref: 'Media', path: 'categories' });

MediaCategory.register();
