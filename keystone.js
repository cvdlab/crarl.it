// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();

// Require keystone
var keystone = require('keystone');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({

  'name': 'CRARL',
  'brand': 'CRARL',
  
  'sass': 'public',
  'static': 'public',
  'favicon': 'public/favicon.ico',
  'views': 'templates/views',
  'view engine': 'jade',
  
  'auto update': true,
  'session': true,
  'auth': true,
  'user model': 'User',
  'cookie secret': 'gmtNkGPu%vK35@qi,ZT}5D~RhT6OMd}E[oXLqU4waCR;-;K81mw*TDMD(?s7LF"b',
  'compress': true,
  'logger': false
});

// Load your project's Models

keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

keystone.set('locals', {
  _: require('underscore'),
  env: keystone.get('env'),
  utils: keystone.utils,
  editable: keystone.content.editable
});

// Load your project's Routes

keystone.set('routes', require('./routes'));

// Setup common locals for your emails. The following are required by Keystone's
// default email templates, you may remove them if you're using your own.

// Configure the navigation bar in Keystone's Admin UI

keystone.set('nav', {
  'news': ['news', 'news-categories'],
  'documents': ['documents', 'document-categories'],
  'projects': ['projects', 'project-categories'],
  'structures': 'structures',
  'people': 'people',
  'users': 'users'
});

// set Admin UI options

keystone.set('wysiwyg images', true);
keystone.set('wysiwyg cloudinary images', true);

// Start Keystone to connect to your database and initialise the web server

keystone.start();
