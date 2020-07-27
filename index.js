const express = require("express");
const cors = require("cors");
const app = express();
const Task = require("./db.js")
app.use(express.json());
app.use(cors());
//Homepage
app.get('/', (req, res) => {
    res.send("Server is working!");
});


//Get all tasks
app.get('/tasks', (req, res) => {
    //console.log("get req coming");
    Task.find({})
        .then((tasks) => {
            res.send(tasks);
            console.log(tasks);
        })
        .catch((err) => {
            console.log(err);
            res.send("Server not responding"+err);
        
        });


});


//Create task
app.post('/tasks', (req, res) => {
    //console.log("Post req coming");
       let task = new Task({
        description: req.body.description,
        label: req.body.label,
        state: req.body.state,
        due_date: req.body.due_date,
        priority: req.body.priority

    });
    task.save()
        .then((result) => {
            res.send(result);

        })
        .catch(() => {
            res.sendStatus(500);
        });
});


//Update Task
app.patch('/tasks/:id', (req, res) => {
    //console.log("Patch req coming");
    
    let id = req.params.id;
    Task.findOneAndUpdate({ _id: id }, {
        $set: req.body
    },{new:true})
    .then((result)=>{
        console.log(result+"hi");
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

//Delete task
app.delete('/tasks/:id', (req, res) => {
    //console.log("Delete req coming");
    let id=req.params.id;
    
    Task.findOneAndDelete(id)
        .then((data)=>{
            console.log(data+"hi");
            res.status(200);
            res.send(id);
        })
        .catch(() => {
            res.status(500);
            res.send("failed to delete")
        });

})


//Start server
app.listen(3000);



