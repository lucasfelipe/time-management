var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    preferedHoursPerDay: Number,
    role: String, //ADMIN, REGULAR, USER_MANAGER
    createdAt: Date,
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
})

const User = mongoose.model('User', userSchema);
module.exports = User;