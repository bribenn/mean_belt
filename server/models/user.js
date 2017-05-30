var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
	name: {
		type: String,
		require: [true, 'please enter a username'],
		unique: true
	},
	bucket_list_items: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'BucketList'
	}]
}, {timestamps: true})

mongoose.model('User', UserSchema)