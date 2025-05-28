🚀 AI-Driven Smart Energy Control System
A real-time, AI-powered IoT solution for efficient energy monitoring, prediction, and automation.

🧠 Problem Statement
⚡ Energy consumption is increasing rapidly, leading to high electricity bills, overloading, and voltage fluctuations.
❌ Traditional meters provide only monthly readings, offering no real-time insights.
🔍 There's no predictive mechanism to forecast energy demand or detect potential faults in advance.

🛠️ Approach & Solution
We propose an AI-Driven Smart Energy Control System that integrates:

📱 Mobile Application for user-friendly monitoring

🧠 AI Predictive Model for forecasting energy demand & detecting anomalies

🔌 IoT Hardware (ESP32, sensors, relays) for real-time data acquisition

🛰️ MQTT Communication to sync IoT devices with the backend

🔍 How It Works:
Sensors (voltage/current) collect real-time energy data via ESP32

AI Model analyzes usage patterns to:

Predict future demand

Detect anomalies (like sudden overloads)

Relay Modules automatically shut down faulty loads to prevent equipment damage

MQTT Protocol transfers data to the Node.js backend

Data is processed & visualized in a beautiful React Native mobile app

✅ Real-time insights
✅ Instant alerts for anomalies
✅ Automatic fault prevention
✅ Ideal for homes, industries, and commercial buildings

✨ Features
⚡ Real-Time Energy Monitoring

🤖 AI-Based Energy Demand Forecasting

🚨 Anomaly Detection & Auto Shutdown

💡 Smart Energy Optimization

📲 Mobile App with Data Visualization

🌐 Cloud-Integrated System

🔐 Secure MQTT Communication

🧰 Tech Stack
🔧 Category	⚙️ Technologies Used
Hardware	Arduino Uno, ESP32, ZMPT101B (Voltage), ACS712 (Current), 4-Channel Relay
Backend	Node.js, Express.js, MongoDB
Frontend	React Native, React Native Chart Kit
Communication	MQTT (Mosquitto / EMQX)
AI/ML	Python (Anomaly Detection Model)
Tools	Figma, Git, GitHub

📸 Screenshots
📲 Mobile Interface
(Insert your screenshots here)

Dashboard	Anomaly Alert

🧪 Run Instructions
🔧 Prerequisites
Node.js

Python 3.x (for AI scripts)

MongoDB (local or Atlas)

MQTT Broker (Mosquitto or EMQX)

Git

Android Emulator or Real Device for mobile testing

cd client 
npm i
npm start
