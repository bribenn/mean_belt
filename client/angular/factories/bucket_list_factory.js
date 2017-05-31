app.factory('BucketListFactory', function($http, $cookies){
	var factory = {};

	factory.create = function(newItem, callback){
		$http.post('/bucketlists/create', newItem).then(callback);
	}
	factory.index = function(callback){
		$http.get('/bucketlists').then(callback)
	}

	return factory;
});