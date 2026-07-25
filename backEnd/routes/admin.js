import express from "express";
import Admin from "../models/Admin.js";

const router = express.Router();

router.post("/adminreg", async (req, res) => {
  
  const admin = new Admin(req.body);
  await admin.save();
  res.json({ message: "Admin registered" });
});

router.post("/adminlog", async (req, res) => {
  // console.log(req.body);
  const {email,password}= req.body;
  const admin = await Admin.findOne({email});

  if (!admin || admin.password !== password) return res.status(401).json({ message: "Invalid credentials" });

  return res.status(200).json({ message: "Login successful", user:{
    _id: admin._id,
    name: admin.name,
    email: admin.email,
    role: admin.role
  }, });
});

export default router