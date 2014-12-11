var keystone = require('keystone'),
  Types = keystone.Field.Types;

/**
 * Project Model
 * ==========
 */

var Project = new keystone.List('Project', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true }
});

Project.add({
  title: { type: Types.Text, required: true },
  state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
  publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
  author: { type: Types.Relationship, ref: 'User', index: true },
  file: { type: Types.LocalFile, dest: 'public/projects', prefix: '/projects' },
  content: {
    brief: { type: Types.Textarea, wysiwyg: true, height: 150 },
    extended: { type: Types.Html, wysiwyg: true, height: 400 }
  },
  categories: { type: Types.Relationship, ref: 'ProjectCategory', many: true }
});

Project.schema.virtual('content.full').get(function() {
  var html_brief = '<p>' + this.content.brief + '</p>';
  return this.content.extended || html_brief;
});

Project.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Project.register();
