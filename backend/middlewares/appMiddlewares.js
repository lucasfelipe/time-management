var User = require('../models/users')
var jwt = require('jsonwebtoken');  
var roles = require('../roles');

const MY_SECRET_KEY = 'MY_SECRET_KEY';


 const verifyToken = (function(req, res, next) {
  if (req.url === '/login' || req.url === '/users') {
    next();
    return;
  }
  var token = req.body.token || req.query.token || req.headers['authorization']; 
  if (token) {
    jwt.verify(token, MY_SECRET_KEY, function(err, decoded) {      
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

const checkRole = (req, res, next) => {
  
  let { decoded, url } = req;

  if(decoded === undefined) {
    next();
    return;
  }
  let isAllowed = roles
                  .find(e => e.profile === decoded.profile)
                  .routes.find(e => url.search(e) >= 0);

  if(isAllowed) {
    next();
  } else {
    return res.status(403).send({ 
        error: { message: 'URL not allowed' }
    });
  }
};



const notFound = (req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
};

const devErrors = (err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
}

module.exports = {
    verifyToken, 
    checkRole,
    devErrors, 
    notFound
}