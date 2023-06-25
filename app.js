var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const mongoConnect = require('./config/database')
var app = express();
const estudianteRouter = require('./routes/estudiante.route')
const cors = require("cors");
const auth = require('./auth/main_auth');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
const usuariosRouter = require('./routes/usuarios.router')


//Database conection settings
mongoose.set('strictQuery', false);
mongoConnect.mongoConnect()


app.listen(3005, () => {
  console.log('Api escuchando en el puerto ' + 3005)
})



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/usuarios', usuariosRouter)
app.use('/estudiante',estudianteRouter)
app.use(auth)



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
