var keystone = require('keystone'),
  async = require('async');

exports = module.exports = function(req, res) {
  
  var view = new keystone.View(req, res),
    locals = res.locals;
  
  // Init locals
  locals.section = 'structures';
  locals.data = {
    structures: []
  };
  
  // Load all the structures
  view.on('init', function(next) {
    
    keystone.list('Structure').model.find().sort('name').exec(function(err, results) {
      
      if (err || !results.length) {
        return next(err);
      }
      
      locals.data.structures = results;
      next(err);
    });
    
  });
  
  // Render the view
  view.render('strutture');
  
}
