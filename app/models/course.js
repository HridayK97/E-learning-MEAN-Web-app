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
		required: false
	},
	image:{
		type: String,
		required: true
	},
	difficulty:{
		type: String,
		required: true
	},
	card_description:{
		type: String,
		required: true
	},
	category:{
		type: String,
		required: true
	},
});

const Course = module.exports = mongoose.model('Course', courseSchema);

// Get Books
module.exports.getCourses = (callback, limit) => {
	Course.find(callback).limit(limit);
}

module.exports.searchCourses = (searchParams,callback, limit) => {
	var query={};
	if(searchParams.input!=null)
	{
		query.$text={$search: searchParams.input};
	}

	if(searchParams.category!=null)
	{
		query.category=searchParams.category;
	}

	if(searchParams.instructor_name!=null)
	{
		query.instructor_name=searchParams.instructor_name;
	}

	Course.find(query,callback).limit(limit);
}


// Get Book
module.exports.getBookById = (id, callback) => {
	Book.findById(id, callback);
}

module.exports.getCourseById = (id,callback) => {
	
	//var query = {'username': username};
	Course.findOne({_id:id},callback);
}

module.exports.addCourse = (course, callback) => {
	console.log(course);
	Course.create(course, callback);
}

module.exports.updateCourse = (id, course, options, callback) => {
	var query = {_id: id};
	console.log(id);
	console.log(course);
	/*var update = {
		username: user.username,
		password: user.password,
		type: user.type,
		courses: user.courses,
		email: user.email,
		phone: user.phone,
		clg: user.clg,
		name: user.name
	}*/
	Course.findOneAndUpdate(query, course, options, callback);
}

module.exports.removeCourse = (id, callback) => {
	var query = {_id: id};
	Course.remove(query, callback);
}

module.exports.updateGenre = (id, genre, options, callback) => {
	var query = {_id: id};
	var update = {
		name: genre.name
	}
	Genre.findOneAndUpdate(query, update, options, callback);
}
