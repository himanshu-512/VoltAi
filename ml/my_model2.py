# Import Libraries
import paho.mqtt.client as mqtt
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
import joblib
import time
import random

# Step 1: Load Pre-Trained Model and Scaler
# Load the pre-trained model and scaler
model = joblib.load('anomaly_detection_model.pkl')
scaler = joblib.load('scaler.pkl')  # Save the scaler during training

# Define thresholds for overflow conditions
current_threshold = 10.0  # Example threshold for current overflow
voltage_threshold = 240.0  # Example threshold for voltage overflow
energy_threshold = 5000.0  # Example threshold for energy overconsumption

# Step 2: MQTT Configuration for Real-Time Data
MQTT_BROKER = "broker.hivemq.com"  # Replace with your MQTT broker address
MQTT_PORT = 1883
MQTT_TOPIC = "sensors/load"  # Replace with your MQTT topic

# Callback when a message is received from the broker
def on_message(client, userdata, message):
    # Decode the message payload
    payload = message.payload.decode('utf-8')
    print(f"Received data: {payload}")

    # Parse the sensor data (assuming CSV format: voltage,current,power,timestamp)
    try:
        voltage, current, power, timestamp = map(float, payload.split(','))
        
        # Create a DataFrame for the new data point
        new_data = pd.DataFrame({
            'voltage': [voltage],
            'current': [current],
            'power': [power],
            'hour': [pd.to_datetime(timestamp, unit='s').hour],
            'day': [pd.to_datetime(timestamp, unit='s').day],
            'month': [pd.to_datetime(timestamp, unit='s').month]
        })

        # Standardize the new data point using the pre-fitted scaler
        new_data_scaled = scaler.transform(new_data)

        # Make a prediction
        prediction = model.predict(new_data_scaled)
        anomaly = prediction[0]

        # Check for overflow conditions
        if anomaly == 1:
            print("Anomaly detected!")
        if current > current_threshold:
            print(f"Overflow current detected: {current}")
        if voltage > voltage_threshold:
            print(f"Overflow voltage detected: {voltage}")
        if power > energy_threshold:
            print(f"Overconsumption of energy detected: {power}")

    except Exception as e:
        print(f"Error processing sensor data: {e}")

# Step 3: Set Up MQTT Client
client = mqtt.Client()
client.on_message = on_message

# Connect to the MQTT broker
client.connect(MQTT_BROKER, MQTT_PORT, 60)
print(f"Connected to MQTT broker at {MQTT_BROKER}")

# Subscribe to the topic
client.subscribe(MQTT_TOPIC)
print(f"Subscribed to topic: {MQTT_TOPIC}")

# Start the MQTT loop to listen for messages
client.loop_start()

# Step 4: Simulate Sensor Data (Optional)
# If you don't have real sensors, use this loop to simulate data
try:
    while True:
        voltage = random.uniform(200, 250)  # Simulate voltage
        current = random.uniform(5, 15)    # Simulate current
        power = voltage * current           # Calculate power
        timestamp = int(time.time())        # Current timestamp

        # Publish data to the topic
        payload = f"{voltage},{current},{power},{timestamp}"
        client.publish(MQTT_TOPIC, payload)
        print(f"Published: {payload}")

        time.sleep(5)  # Wait for 5 seconds before sending the next reading
except KeyboardInterrupt:
    print("Simulation stopped.")

# Keep the script running to listen for messages
try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    print("Script stopped.")

# prompt
# Write AI ml code to predict the overflow current in a load ,overflow of voltage in a load and over consumption of energy in a particular load and can also detect anomalies in a particular load due to frequent fluctuation in voltage and current