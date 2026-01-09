// import User from "../Model/User
const User = require("../Model/User.js")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("dotenv").config()

const Signup = async (req, res) => {
    const {name, email, password} = req.body;

    try {
        if(!name || !email || !password){
            return res.status(400).json({message: "All field are required", success: false})
        }
        // Check if user exists
        const userExist = await User.findOne({email});
        if(userExist){
            res.status(404).json({message: "User already exist", success: false});
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        
        // Save user profile to database
        User.create({name, email, "password": hashedPassword});
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
        const userEmail = await User.findOne({email});
        if(!userEmail){
            res.status(404).json({message: "Email does not exist", success: false})
        }
        // Compare the password
        const passwordMatch = await bcrypt.compare(password, userEmail.password);
        if(!passwordMatch){
            res.status(404).json({message:"Invalid Credentials", success: false});
        }
        // Generate a JWT 
        const token = await jwt.sign({id: userEmail.id, role: userEmail.role}, process.env.JWTSecreteKey, {expiresIn: "1d"} );
        res.json({
            token,
            user:{
                id: userEmail.id,
                name: userEmail.name,
                role: userEmail.role
            },
        })
    } catch (error) {
        console.log(error);       
        return res.status(400).json({message: "Something went wrong"})
    }
}

module.exports = {Signup, Login}