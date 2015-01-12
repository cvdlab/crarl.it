var keystone = require('keystone');

exports = module.exports = function(req, res) {
  
  var view = new keystone.View(req, res),
    locals = res.locals;
  
  // Set locals
  locals.section = 'documenti';
  locals.filters = {
    doc: req.params.doc
  };
  locals.data = {
    doc: {}
  };
  
  // Load the current post
  view.on('init', function(next) {
    
    var q = keystone.list('Document').model.findOne({
      state: 'published',
      slug: locals.filters.doc
    }).populate('author categories');
    
    q.exec(function(err, result) {
      locals.data.doc = result;
      next(err);
    });
    
  });
  
  // Render the view
  view.render('documento');
  
};
