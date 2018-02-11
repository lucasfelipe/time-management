var express = require('express');
var router = express.Router();

var AuthController = require('../controllers/auth');

router.route('/')
    .get(AuthController.checkAuth)

router.route('/login')
    .post(AuthController.login);

module.exports = router