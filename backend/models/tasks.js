var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/mongo-db');

module.exports = mongoose.model('Task', {
    taskname: String,
    time: Number,
    day: Date,
    owner: String,
    createdAt: Date
});