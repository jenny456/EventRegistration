var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var passport = require('passport');
var authenticate = require('./authenticate');
var config = require('./config');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var candidateRouter = require('./routes/candidateRouter');
var session = require("express-session");
const Users = require('./models/user');
const Candidates=require('./models/candidates');

var app = express();

const url=config.mongoUrl;
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log("Connected correctly to server");
}, (err) => { console.log(err); });


//to initialise db admin
var user= new Users ({
  username:"admin",
  password: "admin",
  hash:"1bf88a5ddc0880955b7c920ea43206cfacf86bbef0de6612cfe78486cd72ee5f51297e21bd71f2a9ec065aab1e3c5c9909a9669d5932667214193f1f60776a63b86831968a9b86784da9aeb15b7a9744b0b3dffb11bfbfaab9deb61a1753a60b58b368984a50344834b1d2a444a6ac8dc60e499ce2975bf502e1bbe3b095a87e2fd635459fe49cddf833a256607f0480ff05d6bee7a06478f1fda10b3535d7b14fb2f4c20c4a3c1482b3941c9c03027f2742cbb860e707f2baf158213f21bac0fb4abac61d59833ca09bff2dde6cd6e48ac845ee8e9ece4beb82d9af55f490720bec604892c5870245e1ac130182dde594310fd45af925803587d6ce091f6a336239c628f06536ba4d5c88fbe17fd95a3cda97d31361db0a441342c48a8d4f51020b089a379bf6e919455df1b5430ac0060b45876e9ee334b00c33f9290931308290fdd36d7d23cb7f2cae1733ebb09a96652909b8db3c5e9a0db30c392cfe240f8810c80966e9125f7546fa38d3fd594de7849acd8f2bfdf5e1fd1a9bf9d4e27705c8e524f90030a688f217e4c1fb3d45fde81ea447824d56c9efb57f4c571bc576361adc4bc2831867c8d18ac2ef836ac88179ad249792709eb30218a3d80a5aa60302ed3619a3eb2754c4ffaf94ce929d3bcf76c7ba5d518e538c8872bcafb4ab07e4cd28c9a1bd3282a0e9fadf3f588c7d6821e53983c9726ea7b0b6f9f5",
  salt:"fc8bde0a4abb7ee2df99d21afb8eae280e4ed24af796756866ac6e24628f6243"
});
user.save(function(err,results) {
  if(err) return console.log("user exists");
  // console.log(results._id);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/candidate',candidateRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
