var keystone = require('keystone'),
  Types = keystone.Field.Types;

/**
 * Media Model
 * ==========
 */

var Media = new keystone.List('Media', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true }
});

Media.add({
  title: { type: String, required: true },
  state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
  author: { type: Types.Relationship, ref: 'User', index: true },
  publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
  // image: { type: Types.CloudinaryImage },
  url: { type: Types.Url },
  content: {
    brief: { type: Types.Textarea, wysiwyg: true, height: 150 },
    extended: { type: Types.Html, wysiwyg: true, height: 400 }
  },
  categories: { type: Types.Relationship, ref: 'MediaCategory', many: true }
});

Media.schema.virtual('content.full').get(function() {
  var html_brief = '<p>' + this.content.brief + '</p>';
  return this.content.extended || html_brief;
});

Media.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Media.register();
