const express = require("express");
const router = express.Router();
const { User } = require("../models/Users.model");
const bcrypt= require("bcrypt");
require("dotenv").config();
const jwt= require("jsonwebtoken")


router.post("/register", async (req, res) => {
    try {

        const { name, email, password ,profilePicture} = req.body;

        const user = await User.findOne({ email });

        if (user) return res.status(400).send({ msg: "User Already Persent | Go Login" });

        const hashedPassword= bcrypt.hashSync(password,8);

        const newUser = User({name,email,password:hashedPassword,profilePicture});

        await newUser.save();

        res.status(200).send({ msg: "User Created Successfully" });

    } catch (error) {
        console.log(error)
        res.send({ Err: error })
    }
})



router.post("/login", async (req, res) => {
    try {

        const {  email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) return res.status(400).send({ msg: "User NOt Persent | Go Register" });

     const isPasswordValid= await bcrypt.compare(password,user.password);
     if(!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

       // Generate JWT token
    const token = jwt.sign({ userId: user._id },process.env.jwtSecret);

   
        res.status(200).send({ msg: "Login Successfully","token":token });

    } catch (error) {
        console.log(error)
        res.send({ Err: error })
    }
})


module.exports = router;