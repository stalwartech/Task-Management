const express = require("express")
const {createTask, getTask, updateTask, deleteTask} = require("../Controller/taskController.js")
const authMiddleware = require("../Middleware/authMiddleware.js");

   const taskRouter = express.Router();

   taskRouter.use(authMiddleware);
   taskRouter.post("/create", createTask);
   taskRouter.get("/get", getTask);
   taskRouter.put("/update/:id", updateTask);
   taskRouter.delete("/delete/:id", deleteTask);

   module.exports = taskRouter
