exports.index = function(req,res) {
    console.log('Opening up the socket.io sample');
    res.render('socketio/index', {layout: 'socketio/layout'})
};