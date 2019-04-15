const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tasks');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const passport = require('passport');
var jwt = require('jsonwebtoken');
const LocalStrategy = require('passport-local').Strategy;
// const config = require('./config/database');
const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy   = passportJWT.Strategy;

//TASKS schema
let taskSchema = new mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	datum:{
		type: String,
		required: true
	}
});
mongoose.model('Task', taskSchema);
const Task = mongoose.model('Task');

//REGISTER schema
const UserSchema = mongoose.Schema({
  email:{
    type: String,
    required: true
  },
  username:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  }
});
mongoose.model('User', UserSchema);
const User = mongoose.model('User');

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

//REGISTER PROCESS
app.post('/user/register', function(req, res){
  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  if(!email)
  	return res.json({
  		status: 422,
  		message: 'Please provide email'
  	});
  if(!username)
  	return res.json({
  		status: 422,
  		message: 'Please provide username'
  	});
  if(!password)
  	return res.json({
  		status: 422,
  		message: 'Please provide password'
  	});
  
    let newUser = new User({
      email:email,
      username:username,
      password:password
    });

    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(newUser.password, salt, function(err, hash){
        if(err){
          console.log(err);
        }
        newUser.password = hash;
        newUser.save(function(err){
          if(err){
            console.log(err);
            return;
          } else {
            res.json('You are registered')
          }
        });
      });
    });
});

//LOGIN PROCESS
app.post('/user/login', function(req, res){
	//console.log('its in login/user')
    let data = {
        username: req.body.username,
        // password: req.body.password
    };

    User.findOne(data).lean().exec(function(err, user){
        if(err){
        	console.log('Error');
            return res.json({error: true});
        }
        if(!user){
        	console.log('Wrong user');
            return res.status(404).json({'message':'User not found!'});
        }
       	console.log('You are logged in');
        console.log(user);

        bcrypt.compare(req.body.password, user.password, function(err, response) {
          if(!response) {
            return res.status(404).json({'message':'Incorrect Password'});   
          }
          //global.config.jwt_secret
          let token = jwt.sign(user, 'shhhhh', {
              expiresIn: 1440 // expires in 1 hour
          });

          res.json({error:false, token: token});

        });
    })
});


// logout
// app.get('/logout', function(req, res){
//   req.logout();
//   res.json('success', 'You are logged out');
// });


app.post('/create', function(req, res){
	let task = new Task();
	task.name = req.body.name;
	task.datum = new Date();

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
