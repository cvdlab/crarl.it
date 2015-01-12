var keystone = require('keystone');
var last_news = 5;
var last_docs = 6;

exports = module.exports = function(req, res) {
  
  var view = new keystone.View(req, res);
  var locals = res.locals;
  
  // Init locals
  locals.data = {
    news: [],
    documents: []
  };

  // locals.section is used to set the currently selected
  // item in the header navigation.
  locals.section = 'home';

  // Load last news
  view.on('init', function(next) {
    var q = keystone.list('News').model
      .where('state', 'published')
      .sort('-publishedDate')
      .limit(last_news)
      .populate('author categories');
      
      q.exec(function(err, results) {
        locals.data.news = results;
        next(err);
      });
  });
  
  // Load recent docs
  view.on('init', function(next) {
    var q = keystone.list('Document').model
      .where('state', 'published')
      .sort('-publishedDate')
      .limit(last_docs)
      .populate('author categories');
      
      q.exec(function(err, results) {
        locals.data.documents = results;
        next(err);
      });
  });

  // Render the view
  view.render('index');
  
};
