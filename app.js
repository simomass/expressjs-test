var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(bodyParser.urlencoded({extended: false})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

app.use((req, res, next) => {
  res.header('Access-Contol-Allow-Origin', '*');  //here we are allowing the access to any origin with the * symbol.
  res.header('Access-Contol-Allow-Headers',
   'Origin, X-Requested-With, Content-Type, Accept, Authorization');  //here we are defining which kind of headers we want to accept.
   if(req.method === 'OPTIONS'){
       res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE'); //we are telling the client what methods can be used.
       return res.status(200).json({});
   }
   next();
});
//ABOVE ROUTES

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

app.post('/', (req, res, next) => {
  const post = {
      title: req.body.title,  //here we are setting the title from the request body.
      body: req.body.body //here we are setting the text body from the request body.
  }
  res.status(200).json({
      message: 'New post created',
      createdPost: post   //here we will pass the created post to the response.
  });
});

module.exports = app;
