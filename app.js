const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const user = require('./middleware/user');
const messages = require('./middleware/messages');
const expressSanitizer = require('express-sanitizer');
const engine = require('ejs-locals');

require('./app_server/models/db');
const blog = require('./app_server/routes/blog');
const others = require('./app_server/routes/others');
const users = require('./app_server/routes/user');

const app = express();

// view engine setup
app.set('views', path.join(__dirname,'app_server', 'views'));
app.engine('ejs', engine)
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressSanitizer());
app.use(cookieParser());
app.use(session({secret:'secret', resave: false, saveUninitialized: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(messages);
app.use(user);


/* Main blog page */
app.get('/', blog.mainBlog);
app.get('/posts/:postid', blog.readOne);
app.get('/posts/:postid/delete', blog.deleteOne);
app.post('/posts/:postid', blog.createComment);


/* Admin and users*/
app.get('/admin', users.adminArea);
app.post('/admin', blog.createPost);
app.get('/login', users.form);
app.post('/login', users.login);
app.get('/logout', users.logout);

app.get('/register', users.registerForm);
app.post('/register', users.register);

/* About page */
app.get('/about', others.aboutPage)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error',{err:err});
});

module.exports = app;
