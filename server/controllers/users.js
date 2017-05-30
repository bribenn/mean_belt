var mongoose = require('mongoose')
var User = mongoose.model('User')

module.exports = {
	create: function(request, response){
		User.create(request.body, function(err, user){
			if(err){
				return response.json(err)
			}
			return response.json(user)
		})
	},
	index: function(request, response){
		User.find({}, function(err, users){
			if(err){
				return response.json(err)
			}
			return response.json(users)
		})
	},
	show: function(request, response){
		User.findById(request.params.id).populate('bucket_list_items').exec(function(err, user){
			if(err){
				return response.json(err);
			}
			if(!user){
				return response.json({
					"errors": "404 - User not found!"
				})
			}
			return response.json(user);
		})
	},
}