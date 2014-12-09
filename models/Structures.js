var keystone = require('keystone'),
  Types = keystone.Field.Types;

/**
 * Structure Model
 * ==========
 */

var Structure = new keystone.List('Structure', {
  map: { name: 'name' },
  autokey: { path: 'slug', from: 'name type city', unique: true }
});

Structure.add({
  name: { type: Types.Text, required: true },
  type: { type: Types.Text },
  address: { type: Types.Text },
  city:  { type: Types.Text },
  phone: { type: Types.Text },
  website: { type: Types.Url },
  email: { type: Types.Email }
});

Structure.defaultColumns = 'name, type|20%, address|20%, city|20%';
Structure.register();
