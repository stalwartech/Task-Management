const env = require("dotenv").config()
const express = require("express");
const app = express()
app.use(express.json())
const connectDB = require("./config/mongodb");
const {Login, Signup}= require("./Routes/AuthRoute")
const port = process.env.Port

app.listen(port, async () => {
    console.log(`Listening to ${port}`);
})

connectDB()

app.post('/Register',( req,res)=>{
    const {Email} = req.body
    try {
        if (!Email){
        return res.status(404).json({message: "Invalid User Details"});        
    }
    return res.status(200).json({message: `Welcome on board ${Email}`})
    } catch (error) {
        console.log(error);
        
    }
})

app.post("/Login", Login);
app.post("/Signup", Signup);