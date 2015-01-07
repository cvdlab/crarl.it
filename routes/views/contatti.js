var keystone = require('keystone');

exports = module.exports = function(req, res) {
  
  var view = new keystone.View(req, res),
    locals = res.locals;
  
  // Init locals
  locals.section = 'contatti';
  locals.filters = {
    category: req.params.category
  };
  locals.data = {
    poeple: []
  };

  // Load the posts
  view.on('init', function(next) {
    
    var q = keystone.list('Person').paginate({
        page: req.query.page || 1,
        perPage: 10,
        maxPages: 10
      })
      .sort('-order');
    
    q.exec(function(err, results) {
      locals.data.people = results;
      next(err);
    });
    
  });
  
  // Render the view
  view.render('contatti');
  
};
