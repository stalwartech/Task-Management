// import User from "../Model/User.js"
const User = require("../Model/User.js")
const Signup = async (req, res) => {
    const {name, email, password} = req.body;

    try {
        if(!name || !email || !password){
            return res.status(400).json({message: "All field are required", success: false})
        }
        // Check if user exists
        // Hash password
        // Save user profile to database

        return res.status(200).json({message: `Welcome ${name} you have successfully created your account with ${email}`, success: true})
    } catch (error) {
        console.log(error);
    }
}

const Login = async (req, res) => {
    const {email, password} = req.body;
    try {
        if(!email || !password){
            res.status(404).json({message: "All field but be correctly filled", success: false})
        }
        // Find the email 
        // Decrypt  the password and compare
        // Generate a JWT 
        return res.status(200).json({message: `you have successfully created your account with ${email}`, success: true})
    } catch (error) {
        console.log(error);       
        return res.status(400).json({message: "Something went wrong"})
    }
}

module.exports = {Signup, Login}