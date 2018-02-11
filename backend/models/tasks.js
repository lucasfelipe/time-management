var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const taskSchema = new Schema({
    taskname: String,
    time: Number,
    day: Date,
    owner: String,
    createdAt: Date
})

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;