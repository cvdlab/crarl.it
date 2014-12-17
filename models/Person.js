var keystone = require('keystone'),
  Types = keystone.Field.Types;

/**
 * Person Model
 * ==========
 */

var Person = new keystone.List('Person', {
  map: { name: 'fullname' },
  autokey: { path: 'slug', from: 'fullname', unique: true }
});

Person.add({
  fullname: { type: Types.Text, required: true },
  image: { type: Types.CloudinaryImage },
  tagline: { type: Types.Text },
  address: { type: Types.Text },
  phone: { type: Types.Text },
  email: { type: Types.Email },
  website: { type: Types.Url },
  bio: { type: Types.Html, wysiwyg: true, height: 400 },
  curriculum: { type: Types.LocalFile, dest: 'public/curricula', prefix: '/curricula' },
  order: {type: Types.Number}
});

Person.schema.virtual('content.full').get(function() {
  var htmlBrief = '<p>' + this.content.brief + '</p>';
  return this.content.extended || htmlBrief;
});

Person.defaultColumns = 'fullname, order|20%, email|20%, phone|20%';
Person.register();
