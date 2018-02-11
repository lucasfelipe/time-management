var express = require('express');
var User = require('../models/users');

var router = express.Router();

router.post('/', function(req, res, next) {
    let user = new User({
      username: req.body.user.username,
      password: req.body.user.password,
      profile: req.body.user.profile //ADMIN, REGULAR, USER_MANAGER
    })
    user.save().then(() => console.log('ok'));
    res.json({user: user, success: true});
});

router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, function(err, user) {
        if(err) {
            res.status(500).send({message: "Could not retrieve user with id " + req.params.id});
        } else {
            res.send( {ok: { user } } );
        }
    });
})

router.put('/:id', function(req, res, next) {
    User.findOneAndUpdate({_id: req.params.id}, req.body.user, function(err, data) {
        if(err) {
            res.status(500).send({message: "Could not update user with id " + req.params.id});
        } else {
            res.send( {success: { user: data } } );
        }
    });
})

router.delete('/:id', function(req, res, next) {
   User.remove({_id: req.params.id}, function(err, data) {
        if(err) {
            res.status(500).send({message: "Could not delete user with id " + req.params.id});
        } else {
            res.send({ok: {
                message: "Note deleted successfully!"
              }
            })
        }
    });
});

router.get('/', function(req, res) {
  //console.log('req.decoded', req.decoded);
  User.find({}, function(err, users) {
    res.json({success: true, users});
  });

});   

module.exports = router;
