var express = require('express');
var User = require('../models/users');

var router = express.Router();
var UserController = require('../controllers/users')

router.route('/')
    .get(UserController.index)
    .post(UserController.save);

router.route('/:id')
    .get(UserController.getById)
    .put(UserController.update)
    .delete(UserController.remove);

module.exports = router;
