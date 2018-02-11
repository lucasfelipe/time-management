var User = require('../models/users');

index = (req, res) => {
  User.find({}, function(err, users) {
    res.json({success: true, users});
  });
}

save = (req, res) => {

    let user = new User({
      username: req.body.user.username,
      password: req.body.user.password,
      profile: req.body.user.profile //ADMIN, REGULAR, USER_MANAGER
    })
    user.save().then(() => console.log('ok'));
    res.json({user: user, success: true});

}

getById = (req, res) => {
  User.findById(req.params.id, function(err, user) {
        if(err) {
            res.status(500).send({message: "Could not retrieve user with id " + req.params.id});
        } else {
            res.send( {ok: { user } } );
        }
    });
}

update = (req, res) => {
    User.findOneAndUpdate({_id: req.params.id}, req.body.user, function(err, data) {
        if(err) {
            res.status(500).send({message: "Could not update user with id " + req.params.id});
        } else {
            res.send( {success: { user: data } } );
        }
    });
}

remove = (req, res) => {
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
}

module.exports = {
    index,
    save,
    getById,
    update,
    remove
}