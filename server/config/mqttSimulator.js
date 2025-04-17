import mqtt from "mqtt";

const mqttClientwait = mqtt.connect("mqtt://127.0.0.1:1883"); // Local Mosquitto broker

let totalEnergy = 0; // Track cumulative energy consumption

mqttClientwait.on("connect", () => {
    console.log("✅ Connected to MQTT Broker in Simulator");

    setInterval(() => {
        const timestamp = new Date().toISOString();

        // Simulating realistic voltage between 210V and 230V (AC household range)
        const voltage = (210 + Math.random() * 20).toFixed(2);

        const current = (0.5 + Math.random() * (1.5 - 0.5)).toFixed(2);


        // Calculating power in watts (P = V * I)
        const power = (voltage * current).toFixed(2);

        // Simulating a temperature range (20°C to 45°C)
        // const temperature = (20 + Math.random() * 25).toFixed(1);

        // Calculate energy consumption in Wh (Power * Time (1 second = 1/3600 hours))
        const energy = (power * (1 / 3600)).toFixed(4);
        totalEnergy += parseFloat(energy);

        // Forming data object
        const energyData = { 
            voltage, 
            current, 
            power,  
            energy: parseFloat(energy), 
            totalEnergy: totalEnergy.toFixed(2), 
            timestamp 
        };

        // Publish the data to MQTT broker
        mqttClientwait.publish("smartEnergy/data", JSON.stringify(energyData));

        console.log("Simulated Energy Data:", energyData);
    }, 1000);
});

export default mqttClientwait;
