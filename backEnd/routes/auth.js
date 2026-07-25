import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/register", async (req, res) => {
  const {name,email,password,role} = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({name, email, password: hashedPassword, role});
  await user.save();
  res.json({ message: "User registered" });
});

router.post("/login", async (req, res) => {
  // console.log(req.body);
  const {email,password}= req.body;
  const user = await User.findOne({email});

  if (!user) return res.status(400).json({ message: "User Not Found" });
  const isMatch = await bcrypt.compare(password,user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid password" });
  return res.status(200).json({ message: "Login successful", user:{
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  }, });
});


router.get("/users", async (req, res) => {
  
  const users = await User.find();
  res.json(users);
});


export default router