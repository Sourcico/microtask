const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tasks');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

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


app.use(passport.initialize());
// app.use(passport.session());


passport.use(new LocalStrategy({
  passReqToCallback : true
}, function(username, password, done){
    // Match Username
    let query = {username:username};
    User.findOne(query, function(err, user){
      if(err) throw err;
      if(!user){
        return done(null, false, {message: 'No user found'});
      }

      // Match Password
      bcrypt.compare(password, user.password, function(err, isMatch){
        if(err) throw err;
        if(isMatch){
          return done(null, user);
        } else {
          return done(null, false, {message: 'Wrong password'});
        }
      });
    });
}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
});


// Login Form
app.get('/user/login', function(req, res){
  res.render('login');
});

// Login Process
app.post('/user/login', function(req, res, next){
	console.log('in login function', req.body);
  passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect:'/page2',
    failureFlash: true
  })(req, res, next);
});

// logout
app.get('/logout', function(req, res){
  req.logout();
  res.json('success', 'You are logged out');
});


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
