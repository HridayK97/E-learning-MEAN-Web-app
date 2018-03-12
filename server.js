// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
const util = require('util')

//console.log(util.inspect(myObject, {showHidden: false, depth: null}))

// configuration ===========================================
	
// config files
//var db = require('./config/db');


mongoose.connect('mongodb://localhost/edushare');
var db = mongoose.connection;
User =require('./app/models/user');
Course = require('./app/models/course')

var port = process.env.PORT || 8080; // set our port
// mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override//// header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// routes ==================================================
require('./app/routes')(app); // pass our application into our routes

// start app ===============================================

//get users
app.get('/api/users', (req, res) => {
	console.log(util.inspect(req.params, {showHidden: false, depth: null}));
	User.getUsers((err, user) => {
		if(err){
			throw err;
		}
		res.json(user);
	});
});


//get user according to id for login
app.get('/api/users/:username', (req, res) => {
	var username = req.params.username;
	console.log(username);
	//var genre = req.body;
	User.getUserByUsername(username, (err, user) => {
		if(err){
			throw err;
		}
		//console.log(util.inspect(myObject, {showHidden: false, depth: null}))
		console.log(user);
		res.json(user);

	});
});

//get all courses
app.get('/api/courses', (req, res) => {
	console.log(util.inspect(req.params, {showHidden: false, depth: null}));
	Course.getCourses((err, user) => {
		if(err){
			throw err;
		}
		res.json(user);
	});
});

//get course by id
app.get('/api/courses/:_id', (req, res) => {
	var id = req.params._id;
	console.log(id);
	//var genre = req.body;
	Course.getCourseById(id, (err, course) => {
		if(err){
			throw err;
		}
		//console.log(util.inspect(myObject, {showHidden: false, depth: null}))
		console.log(course);
		res.json(course);

	});
});



app.put('/api/genres/:_id', (req, res) => {
	var id = req.params._id;
	var genre = req.body;
	Genre.updateGenre(id, genre, {}, (err, genre) => {
		if(err){
			throw err;
		}
		res.json(genre);
	});
});



app.listen(port);	
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app