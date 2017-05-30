var Users = require('../controllers/users')
var BucketLists = require('../controllers/bucketlists')

module.exports = function(app){
	app.post('/users', Users.create),
	app.get('/users', Users.index),
	app.get('/bucketlists', BucketLists.index),
	app.get('/users/:id', Users.show),
	app.post('/bucketlists/create', BucketLists.create),
	app.put('/bucketlists/:id', BucketLists.updateStatus)
}