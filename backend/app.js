var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var cors = require('cors');
var dateParser = require('express-query-date');

var index = require('./routes/index');
var users = require('./routes/users');
var tasks = require('./routes/tasks');
var rules = require('./rules');

//TODO: should be removed after
var User = require('./models/users');

var app = express();


app.set('secretKey', 'MY_SECRET_KEY');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({ type: function() { return true; } }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(dateParser({
  formats: ['YYYY-MM-DD']
}));


app.use(cors());

app.use(function(req, res, next) {
  User.find({}, function(err, user) {
    if (err) throw err;

    if (user[0]) {
      next();
    } else {
       var admin = new User({ 
          username: 'admin', 
          password: 'admin',
          profile: 'ADMIN' 
        });
        admin.save((err) => {
          if (err) throw err;
          console.warn('Default user already created')
          next();
        });
    }
  })
});



app.post('/login', function(req, res) {
  console.log(req.body)
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    
    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

    const payload = {
      profile: user.profile,
      _id: user._id
    };
    
    var token = jwt.sign(payload, app.get('secretKey'), {
      expiresIn: '1h'
    });
        res.json({
          success: true,
          message: 'Token Sucess!',
          token: token,
          user: {
            _id: user._id,
            username: user.username,
            profile: user.profile,
            visibleRoutes: rules
                  .find(e => e.profile === user.profile)
                  .routes
          }
        });
      }   
    }
  });
});


app.get('/', function(req, res, next) {
  // check header or url parameters or post parameters for token
  if (req.url === '/login') {
    next();
  }

  var token = req.body.token || req.query.token || req.headers['authorization']; //Bearer token
  // decode token
  if (token) {
      jwt.verify(token, app.get('secretKey'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        return res.json({ success: true, message: 'Token validated.' });
      }
    });
  } else {
    return res.json({success: false, message: 'No token provided.'});
  }
});

app.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  if (req.url === '/login') {
    next();
  }

  
  var token = req.body.token || req.query.token || req.headers['authorization']; //Bearer token
  // decode token
  if (token) {
    jwt.verify(token, app.get('secretKey'), function(err, decoded) {      
      if (err) {
        return res.status(403).send({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        req.decoded = decoded;    
        next();
      }
    });
  } else {
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
  }
});

app.use(function(req, res, next) {
  
  let { decoded, url } = req;

  console.log(url);
  
  let isAllowed = rules
                  .find(e => e.profile === decoded.profile)
                  .routes.find(e => url.search(e) >= 0);

  if(isAllowed) {
    next();
  } else {
    return res.status(403).send({ 
        error: { message: 'URL not allowed' }
    });
  }
});


app.use('/', index);
app.use('/users', users);
app.use('/tasks', tasks);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
