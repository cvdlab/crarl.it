var keystone = require('keystone');

exports = module.exports = function(req, res) {
  
  var view = new keystone.View(req, res),
    locals = res.locals;
  
  // Set locals
  locals.section = 'progetti';
  locals.filters = {
    project: req.params.project
  };
  locals.data = {
    project: {}
  };
  
  // Load the current post
  view.on('init', function(next) {
    
    var q = keystone.list('Project').model.findOne({
      state: 'published',
      slug: locals.filters.project
    }).populate('author categories');
    
    q.exec(function(err, result) {
      locals.data.project = result;
      next(err);
    });
    
  });
  
  // Render the view
  view.render('progetto');
  
};
