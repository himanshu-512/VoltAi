// server.js
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { createServer } from "http";
import connectDB from "./config/db.js";
 import mqttClient from "./config/mqttClient.js";
import io from "./config/socket.js";
import anomalyRoutes from "./routes/anomaly.routes.js";
import sensorRoutes from "./routes/sensor.routes.js";
//   import mqttClientwait from "./config/mqttSimulator.js";
import { getAi } from "./config/aiModel.js";
import userrouter from "./routes/user.route.js";

const app = express();
const httpServer = createServer(app);
io.attach(httpServer);

// Middleware
app.use(express.json());
app.use(cors(
    {
        origin: "*",
    }
));
app.use(morgan("dev"));

// Routes
app.use("/api/v1/anomalylist", anomalyRoutes);
app.use("/api/v1/sensor-data", sensorRoutes);
app.use("/api/v1/user", userrouter);
getAi().then(() => console.log("AI Model loaded"));
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
    httpServer.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});