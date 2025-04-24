# Import Libraries
import paho.mqtt.client as mqtt
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
import joblib
import time
import random


model = joblib.load('anomaly_detection_model.pkl')
scaler = joblib.load('scaler.pkl')  


current_threshold = 10.0 
voltage_threshold = 240.0  
energy_threshold = 5000.0  


MQTT_BROKER = "broker.hivemq.com"  
MQTT_PORT = 1883
MQTT_TOPIC = "sensors/load"  


def on_message(client, userdata, message):
    # Decode the message payload
    payload = message.payload.decode('utf-8')
    print(f"Received data: {payload}")

    
    try:
        voltage, current, power, timestamp = map(float, payload.split(','))
        
        
        new_data = pd.DataFrame({
            'voltage': [voltage],
            'current': [current],
            'power': [power],
            'hour': [pd.to_datetime(timestamp, unit='s').hour],
            'day': [pd.to_datetime(timestamp, unit='s').day],
            'month': [pd.to_datetime(timestamp, unit='s').month]
        })

        
        new_data_scaled = scaler.transform(new_data)

        
        prediction = model.predict(new_data_scaled)
        anomaly = prediction[0]

        
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


client = mqtt.Client()
client.on_message = on_message


client.connect(MQTT_BROKER, MQTT_PORT, 60)
print(f"Connected to MQTT broker at {MQTT_BROKER}")


client.subscribe(MQTT_TOPIC)
print(f"Subscribed to topic: {MQTT_TOPIC}")


client.loop_start()


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

        time.sleep(5)  
except KeyboardInterrupt:
    print("Simulation stopped.")


try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    print("Script stopped.")