import {User} from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export const createUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashPassword });
    await user.save();
    res.status(201).json( { message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Create JWT Token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "yourSecretKey", // use env variable in production
      { expiresIn: "7d" }
    );

    // Send response
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

