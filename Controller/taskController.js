const Task = require("../Model/Task.js");
// const taskRouter = require("../Routes/taskRoutes.js");

// Create task 
const createTask = async (req, res) => {
    try {
        const newTask = await Task.create({
            ...req.body,
            user: req.user.id
        });
        res.status(200).json({message: "Task created successfully", success: true})
    } catch (error) {
        console.log(error);
        res.status(404).json({message: error.message})
    }
}

// Get User task 
const getTask = async (req, res) => {
    try {
        const tasks = await Task.findOne({user: req.user.id})
        res.json(tasks);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

// Update Task
const updateTask = async (req, res) => {
    try {
         const tasks = await Task.findById(req.params.id);
        //check if task exists
         if(!tasks){
            return res.status(404).json({message: "Task not found"})
         }
        //  ownership check or admin
        if((tasks.user.toString() !== req.user.id) && (req.user.role !== "ADMIN")){
            console.log(tasks.user.toString());            
            return res.status(404).json({message: "Not Authorized"})
        }
     
        const updateTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );
        res.json(updateTask)
    } catch (error) {
        return res.status(404).json({message: error.message})
    }
}


const deleteTask = async (req,res) => {
    try {
        const taskToDelete = await Task.findById(req.params.id);

        if(!taskToDelete){
            return res.status(403).json({message: "Task not found"});
        }
        if((taskToDelete.user.toString() !== req.user.id) && (req.user.role !== "ADMIN")){
            return res.status(404).json({message: "Not Authorized"})
        }
        await taskToDelete.deleteOne();
        res.json({message: "Task deleted"})
    } catch (error) {
           res.status(500).json({ message: error.message });
    }
}


module.exports = {createTask, getTask, updateTask, deleteTask};