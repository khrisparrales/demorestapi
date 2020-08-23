const { Router } = require("express");
const router = Router();

const User = require("../models/User");
const jwt = require("jsonwebtoken");
router.post("/signup", async(req, res) => {
    const { email, password } = req.body;
    const newUser = new User({ email, password });
    await newUser.save();
    const token = await jwt.sign({ _id: newUser._id }, "secretkey");
    res.status(200).json({ token });
});
router.get('/', (req, res) => {
    res.send('hello')
});