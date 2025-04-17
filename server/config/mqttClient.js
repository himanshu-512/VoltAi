import mqtt from "mqtt";
import { processMqttMessage } from "../controllers/sensor.controller.js";
const mqttClient = mqtt.connect("mqtt://192.168.186.156:1883");

mqttClient.on("connect", () => {
    console.log("✅ Connected to MQTT Broker");
     mqttClient.subscribe("smartEnergy/data");
});

mqttClient.on("message", async (topic, message) => {
    if (topic === "smartEnergy/data") {
        console.log("Received Energy Data:", message.toString());
        await processMqttMessage(message);
    }
});

export default mqttClient;