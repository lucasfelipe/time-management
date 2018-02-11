var Task = require('../models/tasks');

index = (req, res) => {
 
    Task.find({}, function(err, tasks){
        if(err) 
            res.status(500).send({ error: { message: "Could not retrieve tasks" } });
            
        res.json({ success: { tasks } });
    });

}

save = (req, res) => {
    let task = req.body.task;
    task =  new Task(Object.assign({}, task, {createdAt: new Date()}));
    task.save().then(() => console.log('ok'), err => console.log(err));
    res.json({ success: { task } });
}

getById = (req, res) => {
  Task.findById(req.params.id, function(err, task) {
    if(err) {
       res.status(500).send({ error: { message: "Could not retrieve task with id " + req.params.id } });
    } else {
      res.send( {success: { task } } );
    }
  });
}

update = (req, res) => {
    Task.findOneAndUpdate({_id: req.params.id}, req.body.task, function(err, data) {
        if(err) {
            res.status(500).send({error: { message: "Could not update task with id " + req.params.id } });
        } else {
            res.send( {success: { user: data } } );
        }
    });

}

remove = (req, res) => {
   Task.remove({_id: req.params.id}, function(err, data) {
        if(err) {
            res.status(500).send({message: "Could not delete task with id " + req.params.id});
        } else {
            res.send({success: {
                message: "Task deleted successfully!"
              }
            })
        }
    });
}


module.exports = {
    index,
    save,
    getById,
    update,
    remove
}