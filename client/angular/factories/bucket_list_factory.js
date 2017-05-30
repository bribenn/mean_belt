app.factory('BucketListFactory', function($http, $cookies){
	var factory = {};

	factory.create = function(newItem, callback){
		$http.post('/bucketlists/create', newItem).then(callback);
	}
	factory.index = function(callback){
		$http.get('/bucketlists').then(callback)
	}
	factory.updateStatus = function(bucketList_id, callback){
		$http.put('/bucketlists/id').then(callback)
	}

	return factory;
});