exports.index = function(req,res) {
    console.log('Opening up the nowjs sample');
    res.render('now/index', {layout: 'now/layout'})
};