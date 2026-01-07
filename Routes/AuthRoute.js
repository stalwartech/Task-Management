// import express from "express"
const express = require("express")
// import {Register, Login} from "../Controller/authController.js"
const {Signup, Login} = require("../Controller/authController.js")

const router = express.Router();

router.post("/signup", Signup);
router.post("/login", Login);

module.exports = router;