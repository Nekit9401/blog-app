const mongoose = require('mongoose');
const validator = require('validator');

const PostSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
			validate: {
				validator: validator.isURL,
				message: 'Изображение должно иметь правильную ссылку',
			},
		},
		content: {
			type: String,
			required: true,
		},
		comments: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Comment',
			},
		],
	},
	{ timestamps: true }
);

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
