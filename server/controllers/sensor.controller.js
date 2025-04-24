import SensorData from "../models/sensor.model.js";
import AnomalyLog from "../models/anomalyLog.model.js";
import io from "../config/socket.js";
import detectAnomaly from "../utils/detectAnomaly.js";
import { getEnergy, saveSensorData } from "./energyController.js";
import { parse } from "dotenv";
import { getParticulardata } from "./particular.controller.js";

export const processMqttMessage = async (message) => {
  try {
    const data = JSON.parse(message.toString());
    console.log("📡 Received Energy Data:", data);

    // Emit the received data to clients (optional)
    io.emit("sensor-data1", data);

    // Parse voltage and current
    data.voltage = parseFloat(data.voltage);
    data.current = parseFloat(data.current);

    // Check if the parsed values are valid numbers
    if (isNaN(data.voltage) || isNaN(data.current)) {
      console.error("❌ Invalid voltage or current data:", data);
      return; // Exit if data is invalid
    }

    // Get energy data and check if it is valid
    // const energy = await getEnergy();
    // console.log("💡 Energy Data:", energy);
    getParticulardata(data);
    // Example of emitting data (you may modify this part based on the logic)
    // io.emit("sensor-data2", { current: 0.9 });

    // Save the sensor data (if needed)
    //  await saveSensorData(data);

    // const lastEntry = await SensorData.findOne().sort({ timestamp: -1 });
    // if (lastEntry) {
    //   const timeDiff = (new Date(data.timestamp) - new Date(lastEntry.timestamp)) / 3600000;
    //   data.energy = lastEntry.energy + data.power * timeDiff;
    // } else {
    //   data.energy = 0; // Default energy if no previous data exists
    // }

    // // Check for NaN before continuing
    // if (isNaN(data.energy)) {
    //   console.error("❌ Calculated energy is NaN:", data);
    //   return; // Exit if energy calculation fails
    // }

    // Detect anomalies
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
        value: data.energy, // Check that this is a valid number
        threshold: 0,
        actionTaken: "Load Shutdown",
      });

      await anomalyLog.save();
      console.log("⚠️ Anomaly detected and logged");
    }

    // Ensure energy is a valid number before saving
    if (!isNaN(data.energy)) {
      // await new SensorData(data).save();
      console.log("💾 Data saved to MongoDB");
    } else {
      console.error("❌ Invalid energy value, not saved:", data);
    }
  } catch (error) {
    console.error("❌ Error processing MQTT message:", error);
  }
};
