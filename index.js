const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
//const config = require('./DB.js');
//import api from './client/src/services/api/api.js';
mongoose.connect('mongodb://localhost/tasks');
// let db = mongoose.connection;

// //check connection
// db.once('open', function(){
// 	console.log('Connected to mongodb');
// });

// //check for DB errors
// db.on('error', function(err){
// 	console.log(err);
// });

let taskSchema = new mongoose.Schema({
	name:{
		type: String,
		required: true
	}
});
mongoose.model('Task', taskSchema);
const Task = mongoose.model('Task');
// let Task = require('./models/task.js');

app.use(cors());
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());

//app.get('/', (req, res) => res.send('Hello world'));

//app.get('/', (req, res) => res.send('Hello world'));

app.get('/list', (req, res) => {

	// var oneTask = new Task({name: 'task123'});
	// // oneTask.push();
	// oneTask.save(function (err) {
	// 	if (err) {
	// 		console.log('errrrr: ', err);
	// 	}
	// 	console.log('TASK SAVED');
	// });
	//console.log('DB CONFIG ', Task.db.name, Task.db.host, Task.db.port);
 	Task.find({}, function(err, tasks) {
 		res.send({
 			status: 200,
 			message: 'OK',
 			data: tasks
 		});
 		//console.log('HELLO TASKS ', tasks);
 	});
});







// app.get('/home', (req, res) => {
//     // res.setHeader('Access-Control-Expose-Headers', 'Access-Control-*, Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
//     // res.setHeader('Access-Control-Allow-Methods', 'HEAD, GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     // res.setHeader('Access-Control-Allow-Headers', 'Access-Control-*, Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     //  res.setHeader('Access-Control-Allow-Credentials', true);
//     res.json({deleteRequest: 'OKAY'});
// });


// app.post('/home', (req, res) => {
//     // res.setHeader('Access-Control-Expose-Headers', 'Access-Control-*, Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
//     // res.setHeader('Access-Control-Allow-Methods', 'HEAD, GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     // res.setHeader('Access-Control-Allow-Headers', 'Access-Control-*, Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     //  res.setHeader('Access-Control-Allow-Credentials', true);
//     res.send('POST request');
// });

// app.delete('/home', (req, res) => {
//     // res.setHeader('Access-Control-Expose-Headers', 'Access-Control-*, Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
//     // res.setHeader('Access-Control-Allow-Methods', 'HEAD, GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     // res.setHeader('Access-Control-Allow-Headers', 'Access-Control-*, Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     //  res.setHeader('Access-Control-Allow-Credentials', true);
//     res.send('DELETE request');
// });







//NEW ROUTES
//GET single task
// app.get('/task/:id', function(req, res){
// 	Tasks.findById(req.params.id, function(err, task){
// 		res.render('task', {
// 			task:task
// 		});
// 	});
// });


// home route
// app.get('/', function(req, res){
// 	Task.find({}, function(err, tasks){
// 		if(err){
// 			console.log(err);
		
// 		} else {
// 			res.render('task', {
// 				title:'Tasks',
// 				tasks: tasks
// 			});
// 		}
// 	});
// });

// Add Route
// app.post('/tasks/add', function(req, res){
// 	let task = new Task();
// 	task.title = req.body.title;
	
// 	Task.save(function(err){
// 		if(err){
// 			console.log(err);
// 			return;
// 		} else {
// 			res.redirect('/');
// 		}
// 	});
// });

// UPDATE Route
// app.post('/articles/edit/:id', function(req, res){
// 	let task = {};
// 	task.title = req.body.title;
	
// 	let query = {_id:req.params.id}
	
// 	Task.update(query, article, function(err){
// 		if(err){
// 			console.log(err);
// 			return;
// 		} else {
// 			res.redirect('/');
// 		}
// 	});
// });

// DELETE route
// app.get('/tasks/:id', (req, res) => {
// 	let query = {_id:req.params.id}
	
// 	Article.remove(query, function(err){
// 		if(err){
// 			console.log(err);
// 		}
// 			res.redirect('/');
// 	});
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
