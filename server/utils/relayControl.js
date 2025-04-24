import mqtt from "mqtt";
import mqttClient from "../config/mqttClient.js";


export const turnOffLoad = (loadId) => {
  mqttClient.publish(`relay/control/${loadId}`, JSON.stringify({
    load_id: loadId,
    action: "OFF"
  }));
  };
  
export const turnOnLoad = (loadId) => {
  mqttClient.publish(`relay/control/${loadId}`, JSON.stringify({
    load_id: loadId,
    action: "ON"
  }));
  };
