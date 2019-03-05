let mongoose = require('mongoose');

//Article schema
let taskSchema = new mongoose.Schema({
	name:{
		type: String,
		required: true
	}
	
});

module.exports = {
	Task: mongoose.model('Task', taskSchema)
}