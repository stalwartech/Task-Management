const { default: mongoose } = require("mongoose");
const mongodb = require("mongoose");
const taskSchema = new mongodb.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ["todo", "in-progress", "done"],
        default: "todo"
    },
    priority:{
        type: String,
        enum: ["low", "medium", "high"],
        default: "low",
    },
    dueDate: {
        type: Date
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},
{timestamps: true}
)

module.exports = mongoose.model("Task", taskSchema);