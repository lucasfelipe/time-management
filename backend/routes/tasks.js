var express = require('express');
var router = express.Router();
var Task = require('../models/tasks');
var moment = require('moment');

//TODO: COMPLETAR AS ATIVIDADES

router.post('/', function(req, res, next) {

    console.log('SALVANDO TAREFA', req.body.task);
    // console.log('cadastro', req.body.task)
    const task =  new Task({...req.body.task, createdAt: new Date()});
    // const task = {...req.body.task, createdAt: new Date()};
    //task.timeSpent = moment().add(task.timeSpent, 'h');
    task.save().then(() => console.log('ok'), err => console.log(err));
    res.json({ success: { task } });
});
router.get('/', function(req, res, next) {
    Task.find({}, function(err, tasks){
        if(err) 
            res.status(500).send({ error: { message: "Could not retrieve tasks" } });
            
        res.json({ success: { tasks } });
    });
});

router.get('/:id', function(req, res, next) {
  Task.findById(req.params.id, function(err, task) {
        if(err) {
            res.status(500).send({ error: { message: "Could not retrieve task with id " + req.params.id } });
        } else {
            res.send( {success: { task } } );
        }
    });
})


router.put('/:id', function(req, res, next) {
    Task.findOneAndUpdate({_id: req.params.id}, req.body.task, function(err, data) {
        if(err) {
            res.status(500).send({error: { message: "Could not update task with id " + req.params.id } });
        } else {
            res.send( {success: { user: data } } );
        }
    });
})

// router.put('/:id', function(req, res, next) {
//     Task.findById(req.params.id, function(err, persisted) {
//         if(err) {
//             res.status(500).send({message: "Could not find a task with id " + req.params.id});
//         }

//         let { taskname, timeSpent,  notes } = req.body.task;

//         persisted = {
//             taskName, timeSpent, notes
//         }

//         persisted.save(function(err, data){
//             if(err) {
//                 res.status(500).send({message: "Could not update task with id " + req.params.id});
//             } else {
//                 res.send( {ok: { task } } );
//             }
//         });
//     });
// })

router.delete('/:id', function(req, res, next) {
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
});

module.exports = router