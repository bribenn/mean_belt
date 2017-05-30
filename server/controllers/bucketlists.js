var mongoose = require('mongoose')

var BucketList = mongoose.model('BucketList')
var User = mongoose.model('User')

module.exports = {
	index:  function(request, response){
		BucketList.find({}).populate({
			path: 'user',
			model: 'User'
		})
		.exec(function(err, bucketLists){
			if(err){
				return response.json(error)
			}
			return response.json(bucketLists)
		})
	},
	create: function(request, response){
		BucketList.create(request.body, function(err, bucketList){
			if(err){
				return response.json(err)
			}
			User.findByIdAndUpdate(request.body.user, {$push : {bucket_list_items: bucketList._id}}, function(err, user){
				if(err){
					return response.json(err)
				}
				User.findOneAndUpdate({ 'name': request.body.tag }, {$push: {bucket_list_items: bucketList._id}}, function(err, user){
					if(err){
						return response.json(err)
					}
					return response.json(bucketList)
				})
			})
		})
	},
	updateStatus: function(request, response){
		console.log(request.body)
		BucketList.findByIdAndUpdate(request.params.id, {$set: {'done': true }}, { new: true }, function(err, bucketList){
			if(err){
				console.log(err);
				return response.json(err);
			}
			console.log(bucketList);
			return response.json(bucketList);
		})
	}
}