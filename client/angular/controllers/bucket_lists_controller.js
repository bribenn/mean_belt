app.controller('BucketListController', function(BucketListFactory, UserFactory, $routeParams, $cookies, $location){
	console.log('initializing BucketListController')
	
	var self = this
	self.new_item_errors = []
	self.bucketLists = []

	self.index = function(){
		BucketListFactory.index(function(response){
			self.bucketLists = response.data 
			console.log(self.bucketLists)
		})
	},

	self.create = function(){
		self.new_item_errors = []
		
		UserFactory.session(function(user){
			self.newItem.user = user._id
			BucketListFactory.create(self.newItem, function(response){
					if(response.data.errors){
						for(key in response.data.errors){
							var error = response.data.errors[key]
							self.new_item_errors.push(error.message)
						}
					}
					else {
						self.session()
						self.newItem = {}
					}
			})
		})
	}
})