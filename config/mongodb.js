const mongoose = require("mongoose");
const env = require("dotenv").config();

const URI = process.env.DBURI;

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
  }
};

module.exports = connectDB;
