const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tasks');

let taskSchema = new mongoose.Schema({
	name:{
		type: String,
		required: true
	}
});
mongoose.model('Task', taskSchema);
const Task = mongoose.model('Task');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//GET Route
app.get('/list', (req, res) => {
 	Task.find({}, function(err, tasks) {
 		res.send({
 			status: 200,
 			message: 'OK',
 			data: tasks
 		});
 	});
});


//DELETE route
app.delete('/delete/:id', (req, res) => {
	let query = {_id:req.params.id}

	Task.findByIdAndRemove(query, (err,task) =>{
        if(err) res.json(err);
        else res.json('Task successfully removed');
    });
});

// app.post('/update/:id', (req, res) => {
// 	let task = {};
// 	task.name = req.body.name;
// 	let query = {_id:req.params.id}

// 	Task.findByIdAndUpdate(query, task, (err,task) =>{
//         if(err) res.json(err);
//         else res.json('Task successfully updated');
//     });
// });



//CREATE Route
app.post('/create', function(req, res){
	let task = new Task();
	task.name = req.body.name;

	task.save(function(err){
		if(err){
			console.log('ima greska',err);
			return;
		} else {
			res.json('task added');
		}
	});
});

//UPDATE Route
// app.post('/update', function(req, res){
// 	let task = new Task();
// 	//console.log('OK ');
// 	//console.log('bodyy ', req.body);
// 	task.name = req.body.name;

// 	task.save(function(err){
// 		if(err){
// 			console.log('ima greska',err);
// 			return;
// 		} else {
// 			res.json('task added');
// 		}
// 	});
// });

// app.put('/update/:id', function(req, res){
// 	Task.findById(req.params.id, (err, task)=>{
// 		if(!task)
// 			return next(new Error('Error getting task'));
// 		else {
// 			task.name = req.body.name;
// 			task.save().then(task => {
// 				res.json("task updated");
// 			})
// 			.catch(err=> {
// 				res.status(400).send("error");
// 			});
// 		}
// 	});
	
// });



app.listen(port, () => console.log(`Example app listening on port ${port}!`));
