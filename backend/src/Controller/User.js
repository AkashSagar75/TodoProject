const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Model/User");
  const Employee = require('../Model/employee')
  const Todo = require('../Model/todo')
  
const SECRET_KEY = process.env.SECRET_KEY;
 exports.Registation = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

   
    const hashedPassword = await bcrypt.hash(password, 10);

   
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully!", user });
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
 exports.Login =  async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    
    const token = jwt.sign(
      { id: user._id, role: user.role },
            SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: "admin" } }).select("-password"); 
    
    res.status(200).json({ users });
  } catch (err) {
    console.error("Get Users Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.deleteOne();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete User Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

 exports.UpdateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, password, role } = req.body;
 
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

 
    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;

     
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    res.status(200).json({ message: "User updated successfully!", user });
  } catch (err) {
    console.error("Update User Error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

exports.getuser = async (req, res) => {
  try {
    const users = await User.find().select("-password"); 
    res.status(200).json({ users });
  } catch (error) {
    console.error("Get All Users Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
exports.TotalTask = async (req, res) => {
  try {
    const totalEmployees = await User.countDocuments({ role: { $ne: "admin" } });
    const totalTasks = await Todo.countDocuments();
    const pendingTasks = await Todo.countDocuments({ status: "pending" });
    const activeEmployees = await Todo.distinct("assignedTo");
     res.json({
      totalEmployees,
      totalTasks,
      pendingTasks,
      activeEmployees: activeEmployees.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Todo.find()
      .populate("assignedTo", "name email role") 
      .populate("createdBy", "name email role")   
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    console.error("Get Tasks Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
exports.getTaskStats = async (req, res) => {
  try {
    const totalTasks = await Todo.countDocuments();

    const completedTasks = await Todo.countDocuments({ status: "completed" });
    const inProgressTasks = await Todo.countDocuments({ status: "in-process" });
    const pendingTasks = await Todo.countDocuments({ status: "pending" });

    
    const productivity =
      totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(2) : 0;

    res.json({
      totalTasks,
      completedTasks,
      inProgressTasks,
      pendingTasks,
      productivity: `${productivity}%`,
    });
  } catch (error) {
    console.error("Error fetching task stats:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
