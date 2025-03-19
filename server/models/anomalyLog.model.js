import mongoose from "mongoose";

const anomalyLogSchema = new mongoose.Schema({
  loadId: {
    type: String,
    required: true,
  }, // Unique ID for the sensor
  parameter: {
    type: Object,
    ref: "SensorData",
    required: true,
  }, // e.g., voltage, current, power
  detectedAt: {
    type: Date,
    default: Date.now,
  }, // Timestamp of anomaly detection
  value: {
    type: Number,
    required: true,
  }, // Anomalous value detected
  threshold: {
    type: Number,
    required: true,
  }, // Expected safe limit
  actionTaken: {
    type: String,
    enum: ["None", "Load Shutdown", "Alert Sent"],
    default: "None",
  }, // System response
});

const AnomalyLog = mongoose.model("AnomalyLog", anomalyLogSchema);
export default AnomalyLog;
