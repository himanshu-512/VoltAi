import mqtt from "mqtt";
import io from "../config/socket.js";
import mqttClient from "../config/mqttClient.js";
export const getParticulardata = (data) => {
    let voltage=data.voltage;
    let current=data.current;

    const powerofLoad1=3;
    const powerofLoad2=5;
    const powerofLoad3=7;
    const powerofLoad4=9;

    let load_I1 = powerofLoad1/voltage;
    let load_I2 = powerofLoad2/voltage;
    let load_I3 = powerofLoad3/voltage;
    let load_I4 = powerofLoad4/voltage;
    console.log(load_I1.toFixed(3),load_I2.toFixed(3),load_I3.toFixed(3),load_I4.toFixed(3));
    io.emit("particular-data1", { load_I1 });
    io.emit("particular-data2", { load_I2 });
    io.emit("particular-data3", { load_I3 });
    io.emit("particular-data4", { load_I4 });
    io.emit("particular-data", { load_I1, load_I2, load_I3, load_I4 });
     // Check for overload (> 1A) and publish MQTT command
    if (load_I1 <= 0) mqttClient.publish("relay/load1", "OFF");
    if (load_I2 <= 0) mqttClient.publish("relay/load2", "OFF");
    if (load_I3 > 1) mqttClient.publish("relay/load3", "OFF");
    if (load_I4 > 1) mqttClient.publish("relay/load4", "OFF");
    mqttClient.publish("smartEnergy/autoShutdown", JSON.stringify({ load_I1, load_I2, load_I3, load_I4 }));
}