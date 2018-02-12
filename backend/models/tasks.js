var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const taskSchema = new Schema({
    timeSpent: Number,
    day: Date,
    note: String,
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: Date
})

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;