const env = require("dotenv").config()
const express = require("express");
const authRoute = require("./Routes/AuthRoute.js")
const taskRoute = require("./Routes/taskRoutes.js")
const aiRoute = require("./Routes/aiRoutes.js")

const app = express()
app.use(express.json())
const connectDB = require("./config/mongodb");
const port = process.env.PORT || 5000

app.listen(port, async () => {
    console.log(`Listening to ${port}`);
})

connectDB()
app.use("/auth", authRoute)
app.use("/task", taskRoute)
app.use("/api/ai", aiRoute)
