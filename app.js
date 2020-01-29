const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

const AuthController = require('./controllers/AuthController')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



// app.use('/api/v1/users', users);

// Api endpoints (public)
app.route('/api/v1/signup')
    .post(AuthController.validateReg, AuthController.postReg)

app.route('/api/v1/login')
    .post(AuthController.postLogin)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;
