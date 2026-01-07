// import mongoose from "mongoose";
const mongoose = require("mongoose")
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique:  true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true,
            enum: ["USER", "ADMIN"],
            default: "USER"
        },
        isPremium: {
            type: Boolean,
            default: false
        },
    },
    {timestamps:true}
);

module.exports= mongoose.model("User", userSchema)