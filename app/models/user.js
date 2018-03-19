const mongoose = require('mongoose');

// Book Schema
const userSchema = mongoose.Schema({
	username:{
		type: String,
		required: true
	},
	password:{
		type: String,
		required: true
	},
	type:{
		type: String,
		required: true
	},
	courses:{
		type: Array,
		required: false
	},
	email:{
		type: String,
		required: true
	},
	phone:{
		type: Number,
		required: true
	},
	clg:{
		type: String,
		required: false
	},
	name:{
		type: String,
		required: true
	},
	notif:{
		type: Array,
		required: false
	}

});

const User = module.exports = mongoose.model('User', userSchema);

// Get Books
module.exports.getUsers = (callback, limit) => {
	User.find(callback).limit(limit);
}

module.exports.getInstructors = (callback, limit) => {
	User.find({type:"instructor"},callback).limit(limit);
}

// Get Book
module.exports.getBookById = (id, callback) => {
	Book.findById(id, callback);
}

module.exports.getUserByUsername = (name,callback) => {
	
	//var query = {'username': username};
	User.findOne({username:name},callback);
}


module.exports.updateUser = (id, user, options, callback) => {
	var query = {_id: id};
	console.log(id);
	console.log(user);
	var update = {
		username: user.username,
		password: user.password,
		type: user.type,
		courses: user.courses,
		email: user.email,
		phone: user.phone,
		clg: user.clg,
		name: user.name
	}
	User.findOneAndUpdate(query, user, options, callback);
}

module.exports.addUser = (user, callback) => {
	console.log(user);
	User.create(user, callback);
}


module.exports.updateGenre = (id, genre, options, callback) => {
	var query = {_id: id};
	var update = {
		name: genre.name
	}
	Genre.findOneAndUpdate(query, update, options, callback);
}
