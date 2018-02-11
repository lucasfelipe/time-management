var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    preferedHoursPerDay: Number,
    notes: [String],
    profile: String //ADMIN, REGULAR, USER_MANAGER
})

const User = mongoose.model('user', userSchema);
module.exports = User;