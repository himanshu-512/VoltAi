import mqtt from "mqtt";
import mqttClient from "../config/mqttClient.js";


export const turnOffLoad = (loadId) => {
    mqttClient.publish(`relay/control/${loadId}`, "off");
  };
  
  export const turnOnLoad = (loadId) => {
    mqttClient.publish(`relay/control/${loadId}`, "on");
  };
