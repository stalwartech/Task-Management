const axios = require("axios");
const Task = require("../Model/Task.js");

const optimizeTask = async (req, res) => {
    try{
        const {taskId} = req.body;
        const task = await Task.findById(taskId);
        if(!task){
            return res.status(404).json({message: "Task not found"});
        }
        if (task.user.toString() != req.user.id && req.user.role !== "ADMIN"){
            return res.status(404).json({message: "Not Authorized"});
        }

        const prompt = `Optimize the following task: Title${task.title} Description ${task.description} || "None
        Return:
        - Improved title
        - Improved description
        - Suggested priority (low, medium, high)`
    }
    catch(error){
        return res.status(404).json({message: error.message});
    }
}