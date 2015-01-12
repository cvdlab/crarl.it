var keystone = require('keystone');

exports = module.exports = function(req, res) {
  
  var view = new keystone.View(req, res),
    locals = res.locals;
  
  // Set locals
  locals.section = 'notizie';
  locals.filters = {
    news: req.params.news
  };
  locals.data = {
    news: {}
  };
  
  // Load the current post
  view.on('init', function(next) {
    
    var q = keystone.list('News').model.findOne({
      state: 'published',
      slug: locals.filters.news
    }).populate('author categories');

    q.exec(function(err, result) {
      locals.data.news = result;
      next(err);
    });

  });

  
  // Render the view
  view.render('notizia');

};

