const task = require("../Model/Task.js");

// Create task 
const createTask = async (req, res) => {
    try {
        const newTask = await task.create({
            ...req.body,
            user: req.user.id
        });
        res.status(200).json({message: "Task created successfully", success: true})
    } catch (error) {
        console.log(error);
        res.status(404).json({message: error.message})
    
    }
}