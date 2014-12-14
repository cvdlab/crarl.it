var keystone = require('keystone'),
  Types = keystone.Field.Types;

/**
 * DocumentCategory Model
 * ==================
 */

var DocumentCategory = new keystone.List('DocumentCategory', {
  autokey: { from: 'name', path: 'key', unique: true }
});

DocumentCategory.add({
  name: { type: Types.Text, required: true }
});

DocumentCategory.relationship({ ref: 'Document', path: 'categories' });

DocumentCategory.register();
