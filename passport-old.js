// // const LocalStrategy = require('passport-local').Strategy;
// // const User = require('../models/user');
// // const config = require('../config/database');
// // const bcrypt = require('bcryptjs');
// //
// // module.exports = function(passport){
// //   // Local Strategy
// //   passport.use(new LocalStrategy(function(username, password, done){
// //     // Match Username
// //     let query = {username:username};
// //     User.findOne(query, function(err, user){
// //       if(err) throw err;
// //       if(!user){
// //         return done(null, false, {message: 'No user found'});
// //       }
// //
// //       // Match Password
// //       bcrypt.compare(password, user.password, function(err, isMatch){
// //         if(err) throw err;
// //         if(isMatch){
// //           return done(null, user);
// //         } else {
// //           return done(null, false, {message: 'Wrong password'});
// //         }
// //       });
// //     });
// //   }));
// //
// //   passport.serializeUser(function(user, done) {
// //     done(null, user.id);
// //   });
// //
// //   passport.deserializeUser(function(id, done) {
// //     User.findById(id, function(err, user) {
// //       done(err, user);
// //     });
// //   });
// // }


// // file: index.js

// var _ = require("lodash");
// var express = require("express");
// var bodyParser = require("body-parser");
// var jwt = require('jsonwebtoken');

// var passport = require("passport");
// var passportJWT = require("passport-jwt");

// var ExtractJwt = passportJWT.ExtractJwt;
// var JwtStrategy = passportJWT.Strategy;

// var users = [
//   {
//     id: 1,
//     name: 'jonathanmh',
//     password: '%2yx4'
//   },
//   {
//     id: 2,
//     name: 'test',
//     password: 'test'
//   }
// ];

// var jwtOptions = {}
// jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
// jwtOptions.secretOrKey = 'tasmanianDevil';

// var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
//   console.log('payload received', jwt_payload);
//   // usually this would be a database call:
//   var user = users[_.findIndex(users, {id: jwt_payload.id})];
//   if (user) {
//     next(null, user);
//   } else {
//     next(null, false);
//   }
// });

// passport.use(strategy);

// var app = express();
// app.use(passport.initialize());

// // parse application/x-www-form-urlencoded
// // for easier testing with Postman or plain HTML forms
// app.use(bodyParser.urlencoded({
//   extended: true
// }));

// // parse application/json
// app.use(bodyParser.json())

// app.get("/", function(req, res) {
//   res.json({message: "Express is up!"});
// });

// app.post("/login", function(req, res) {
//   if(req.body.name && req.body.password){
//     var name = req.body.name;
//     var password = req.body.password;
//   }
//   // usually this would be a database call:
//   var user = users[_.findIndex(users, {name: name})];
//   if( ! user ){
//     res.status(401).json({message:"no such user found"});
//   }

//   if(user.password === req.body.password) {
//     // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
//     var payload = {id: user.id};
//     var token = jwt.sign(payload, jwtOptions.secretOrKey);
//     res.json({message: "ok", token: token});
//   } else {
//     res.status(401).json({message:"passwords did not match"});
//   }
// });

// app.get("/secret", passport.authenticate('jwt', { session: false }), function(req, res){
//   res.json({message: "Success! You can not see this without a token"});
// });

// app.get("/secretDebug",
//   function(req, res, next){
//     console.log(req.get('Authorization'));
//     next();
//   }, function(req, res){
//     res.json("debugging");
// });

// app.listen(3000, function() {
//   console.log("Express running");
// });