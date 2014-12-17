var keystone = require('keystone'),
  Types = keystone.Field.Types;

/**
 * News Model
 * ==========
 */

var News = new keystone.List('News', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true }
});

News.add({
  title: { type: Types.Text, required: true },
  state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
  author: { type: Types.Relationship, ref: 'User', index: true },
  publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
  file: { type: Types.LocalFile, dest: 'public/news', prefix: '/news' },
  image: { type: Types.CloudinaryImage },
  url: { type: Types.Url },
  content: {
    brief: { type: Types.Textarea, wysiwyg: true, height: 150 },
    extended: { type: Types.Html, wysiwyg: true, height: 400 }
  },
  categories: { type: Types.Relationship, ref: 'NewsCategory', many: true }
});

News.schema.virtual('content.full').get(function() {
  var htmlBrief = '<p>' + this.content.brief + '</p>';
  return this.content.extended || htmlBrief;
});

News.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
News.register();
