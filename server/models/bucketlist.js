var mongoose = require('mongoose')

var BucketListSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	title: {
		type: String,
		require: [true, 'please enter a title'],
		minlength: [5, 'title must be at least 5 characters']
	},
	description: {
		type: String,
		require: [true, 'please enter a description'],
		minlength: [10, 'description must be at least 10 characters']
	},
	done: {
		type: Boolean,
		default: false
	}
}, {timestamps: true})

mongoose.model('BucketList', BucketListSchema)