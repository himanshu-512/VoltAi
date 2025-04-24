import mqtt from "mqtt";
import { processMqttMessage } from "../controllers/sensor.controller.js";
import io from "./socket.js";
const mqttClient = mqtt.connect("mqtt://192.168.186.156:1883");

mqttClient.on("connect", () => {
    console.log("✅ Connected to MQTT Broker");
     mqttClient.subscribe("smartEnergy/data");
    mqttClient.subscribe("smartEnergy/relayStatus");
});

mqttClient.on("message", async (topic, message) => {
    if (topic === "smartEnergy/data") {
        console.log("Received Energy Data:", message.toString());
        await processMqttMessage(message);
    }
});
mqttClient.on('message', (topic, message) => {
    if (topic === 'smartEnergy/relayStatus') {
      try {
        const data = JSON.parse(message.toString());
  
        const relay = data.relay;     // e.g. "relay1"
        const status = data.status;   // "ON" or "OFF"
        const timestamp = new Date().toISOString();
  io.emit("relay-data", relay, status);
        console.log(`⚡ Relay Update → ${relay}: ${status} at ${timestamp}`);
  
        // TODO: Save to DB or log file if needed
      } catch (err) {
        console.error('❌ Invalid JSON format:', err.message);
      }
    }
  });

export default mqttClient;