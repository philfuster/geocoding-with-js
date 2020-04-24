const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const debug = require('debug');

/*
  === Local Variables ===
*/
// Express Session Ooption Object
const sess = {
  secret: 'Phil is cool... duh',
  resave: false,
  saveUninitialized: false,
  cookie: {
    Secure: true,
    SameSite: 'none',
  },
};
// Binding debug's output to the console.
// Initializing Loggers
debug.log = console.log.bind(console);
const log = debug('geocoding:app');

// Router declaration
const indexRouter = require('./routes/index');

/*
  === Function Definitions ===
 */
function errorHandler(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  next();
}

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/routes')));
app.use(session(sess));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(errorHandler);

log('Geocoding Application started...');

module.exports = app;
