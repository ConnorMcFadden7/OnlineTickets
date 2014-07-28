var express      = require('express');
var path         = require('path');
var favicon      = require('static-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var errorHandler = require('errorhandler');

var routes = require('./routes/index');
var admin  = require('./routes/admin');

var app = express();

app.set('port', process.env.PORT || 3000);

/* Authentication for admin */
app.use('/admin', function(req, res, next) {
    var auth;
    if (req.headers.authorization) {
      auth = new Buffer(req.headers.authorization.substring(6), 'base64').toString().split(':');
    }

    /* Check the username and password matches */
    if (!auth || auth[0] !== 'admin' || auth[1] !== 'testpassword') {
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic realm="MyRealmName"');
        res.end('Unauthorized');
    } else {

        next();
    }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(errorHandler());

app.use('/', routes);
app.use('/admin', admin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

var server = app.listen(app.get('port'), function() {
 	console.log('Express server listening on port ' + server.address().port);
});
