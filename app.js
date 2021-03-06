var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var aos = require('aos')
const dotenv = require('dotenv').config()
var db = require("./config/db-connection")
var hbs = require("express-handlebars");
var upload = require("express-fileupload");
var Promise = require("promise");
var session = require("express-session")

var indexRouter = require('./routes/index');
var devRouter = require('./routes/dev');
const { fileURLToPath } = require('url');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs',hbs({
  extname:'hbs',
  defaultLayout:"layout",
  layoutsDir:__dirname+'/views/layout/',
  partialsDir:__dirname+'/views/partials/'
}))

app.use(logger('dev'));
app.use(express.json());
app.use(upload());  
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:"key",cookie:{maxAge:60000000}}))

db.connect((err)=>{
  if(err) console.log("Unable to connect to Database "+err);
  else console.log("Database Connected");
})

app.use('/', indexRouter);
app.use('/dev', devRouter);

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
