var express = require('express');
var router = express.Router();

var TaskController = require('../controllers/tasks');

router.route('/')
    .post(TaskController.save)
    .get(TaskController.index);

router.route('/:id')
    .get(TaskController.getById)
    .put(TaskController.update)
    .delete(TaskController.remove);

module.exports = router