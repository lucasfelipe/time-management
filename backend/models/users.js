var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/mongo-db');

module.exports = mongoose.model('User', new Schema({
    username: String,
    password: String,
    preferedHoursPerDay: Number,
    notes: [String],
    profile: String //ADMIN, REGULAR, USER_MANAGER
}));