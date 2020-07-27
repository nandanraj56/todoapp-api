const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/taskorganizer",{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log("connected successfully"))
.catch((err)=>console.log("Error: "+err.message));
mongoose.Promise = global.Promise;

const taskSchema=new mongoose.Schema({
    description: String,
    label: String,
    state: String,
    due_date: String,
    priority: String,
});
const Task=mongoose.model("tasks",taskSchema);
module.exports=Task;