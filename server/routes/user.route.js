import express from "express";
import { createUser, Login } from "../controllers/user.controllers.js";


const userrouter = express.Router();


userrouter.post("/sign-up", createUser);
userrouter.get("/login", Login);

export default userrouter;