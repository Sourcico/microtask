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


app.get('/list', (req, res) => {
 	Task.find({}, function(err, tasks) {
 		res.send({
 			status: 200,
 			message: 'OK',
 			data: tasks
 		});
 	});
});


app.delete('/delete/:id', (req, res) => {
	let query = {_id:req.params.id}

	Task.findByIdAndRemove(query, (err,task) =>{
        if(err) res.json(err);
        else res.json('Task successfully removed');
    });
});


app.post('/create', function(req, res){
	let task = new Task();
	task.name = req.body.name;

	task.save(function(err){
		if(err){
			console.log('Error: ',err);
			return;
		} else {
			res.json('Task successfully added');
		}
	});
});


app.post('/update/:id', (req, res) => {
	let task = {};
	task.name = req.body.name;

	let query = {_id:req.params.id}
	Task.update(query, task, (err,task) =>{
        if(err){ 
        	res.json(err); }
        else{
         res.json('Task successfully updated');
    	}
    });
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
