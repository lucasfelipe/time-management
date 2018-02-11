var Task = require('../models/tasks');

module.exports = {
    index: async (req, res) => {
        const tasks = await Task.find({})
        res.status(200).json({ success: { tasks } });
    },

    save: async (req, res) => {
        let task = req.body.task;
        task =  new Task({...task, createdAt: new Date()});
        await task.save();
        res.json({ success: { task } });
    },

    getById: async (req, res) => {
        let { id } = req.params;
        let task = await Task.findById(id);
        res.status(200).json({ success: { task } });
    },

    update:  async (req, res) => {
        let { id } = req.params;
        let { task } = req.body;
        task = await Task.findOneAndUpdate({_id: id}, task);
        res.status(200).json( {success: { task } } )
    },
    
    remove: async (req, res) => {
        let { id } = req.params;
        await Task.remove({_id: id});
        res.status(200).json({ success: { message: "Deleted"}})
    }
}


