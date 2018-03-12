const mongoose = require('mongoose');

// Book Schema
const courseSchema = mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	vidlink:{
		type: String,
		required: true
	},
	description:{
		type: String,
		required: true
	},
	instructor_name:{
		type: String,
		required: true
	},
	instructor_id:{
		type: String,
		required: true
	},
	image:{
		type: String,
		required: true
	},
	difficulty:{
		type: String,
		required: true
	},
	category:{
		type: String,
		required: true
	},
	card_description:{
		type: String,
		required: true
	},
});

const Course = module.exports = mongoose.model('Course', courseSchema);

// Get Books
module.exports.getCourses = (callback, limit) => {
	Course.find(callback).limit(limit);
}

// Get Book
module.exports.getBookById = (id, callback) => {
	Book.findById(id, callback);
}

module.exports.getCourseById = (id,callback) => {
	
	//var query = {'username': username};
	Course.findOne({_id:id},callback);
}

module.exports.updateGenre = (id, genre, options, callback) => {
	var query = {_id: id};
	var update = {
		name: genre.name
	}
	Genre.findOneAndUpdate(query, update, options, callback);
}
