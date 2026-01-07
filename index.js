const env = require("dotenv").config()
const express = require("express");
const router = require("./Routes/AuthRoute.js")
const app = express()
app.use(express.json())
const connectDB = require("./config/mongodb");
const port = process.env.Port

app.listen(port, async () => {
    console.log(`Listening to ${port}`);
})

connectDB()
app.use("/", router)
