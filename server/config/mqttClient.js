import mqtt from "mqtt";
import { processMqttMessage } from "../controllers/sensor.controller.js";
const mqttClient = mqtt.connect("mqtt://127.0.0.1:1883");

mqttClient.on("connect", () => {
    console.log("✅ Connected to MQTT Broker");
    mqttClient.subscribe("energy/data");
});

mqttClient.on("message", async (topic, message) => {
    if (topic === "energy/data") {
        await processMqttMessage(message);
    }
});

export default mqttClient;