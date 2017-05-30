app.controller('UsersController', function(UserFactory, BucketListFactory, $routeParams, $cookies, $location){
	console.log('initializing UsersController')
	
	var self = this
	self.errors = []
	self.current_user = {}
	self.users = []
	self.user = {}

	self.session = function(){
		UserFactory.session(function(user){
			if(user){
				self.current_user = user
			}
			else {
				$location.url('/')
			}
		})
	},
	self.index = function(){
		UserFactory.index(function(response){
			self.users = response.data
		})
	},
	self.create = function(newUser){
		self.errors = []
		console.log(newUser)
		UserFactory.create(newUser, function(response){
			console.log(response)
			if(response.data.errors){
				for(key in response.data.errors){
					var error = response.data.errors[key]
					self.errors.push(error.message)
				}	
			}
			else {
				var user_id = response.data._id
				$cookies.put('user_id', user_id)
				$location.url('/dashboard')
			}
		})
	},
	self.show = function(){
  		UserFactory.show($routeParams.id, function(response){
  			console.log('show:' + response)
  			self.user = response.data
  			return self.user
  		})
  	},
	self.logout = function(){
		$cookies.remove('user_id')
		$location.url('/')
	}
	self.updateStatus = function(bucketList_id){
		console.log(bucketList_id)
		UserFactory.updateStatus(bucketList_id, self.session)
	}
	self.createItem = function(){
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