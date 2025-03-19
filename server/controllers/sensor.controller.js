import SensorData from "../models/sensor.model.js";
import AnomalyLog from "../models/anomalyLog.model.js";
import io from "../config/socket.js";
import detectAnomaly from "../utils/detectAnomaly.js";
import { getEnergy, saveSensorData } from "./energyController.js";
import { parse } from "dotenv";
export const processMqttMessage = async (message) => {
  try {
    const data = JSON.parse(message.toString());
    console.log("📡 Received Energy Data:", data);
    io.emit("sensor-data1", data);
    data.voltage = parseFloat(data.voltage);
    data.current = parseFloat(data.current);
    const energy = await getEnergy();
    console.log("💡 Energy Data:", energy);
    // let timestamp = parseDate(data.timestamp);
    // io.emit("sensor-data", energy);
    // console.log(io.emit("sensor-data", energy));
    await saveSensorData(data);
    const lastEntry = await SensorData.findOne().sort({ timestamp: -1 });
    if (lastEntry) {
      const timeDiff =
        (new Date(data.timestamp) - new Date(lastEntry.timestamp)) / 3600000;
      data.energy = lastEntry.energy + data.power * timeDiff;
    } else {
      data.energy = 0;
    }
    data.anomaly = detectAnomaly(data);
    if (data.anomaly) {
      const anomalyLog = new AnomalyLog({
        loadId: Math.floor(Math.random() * 100),
        parameter: {
          voltage: data.voltage,
          current: data.current,
          power: data.power,
        },
        detectedAt: data.timestamp,
        value: data.energy,
        threshold: 0,
        actionTaken: "Load Shutdown",
      });

      await anomalyLog.save();
    }
    if (!isNaN(data.energy)) {
      await new SensorData(data).save();
      console.log("💾 Data saved to MongoDB");
    }
  } catch (error) {
    console.error("❌ Error processing MQTT message:", error);
  }
};
