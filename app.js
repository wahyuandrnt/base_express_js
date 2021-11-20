var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var apiRouter = require('./api/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'))
   .engine('html', require('ejs').renderFile)
   .set('view engine', 'ejs');

app.use(logger('dev'))
   .use(express.json())
   .use(express.urlencoded({ extended: false }))
   .use(cookieParser())
   .use(express.static(path.join(__dirname, 'public')))
   .use('/', indexRouter)
   .use('/api', apiRouter);

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
