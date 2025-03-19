import express from "express";
import { getSensorData } from "../controllers/energyController.js";


const router = express.Router();

router.get("/sensor", getSensorData);

export default router;