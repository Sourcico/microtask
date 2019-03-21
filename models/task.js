let mongoose = require('mongoose');

//Task schema
let taskSchema = new mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	created_at:{
		type: Date
	}
	
});

module.exports = {
	Task: mongoose.model('Task', taskSchema)
}