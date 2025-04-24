import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import IsolationForest
from sklearn.metrics import accuracy_score
import matplotlib.pyplot as plt
from fastapi import FastAPI, Body
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

# Generate and prepare data
time = np.arange(0, 1000, 1)
current = np.random.normal(loc=5, scale=1, size=len(time))  # Amperes
voltage = np.random.normal(loc=220, scale=10, size=len(time))  # Volts
power = current * voltage
energy = np.cumsum(power)
data = pd.DataFrame({'time': time, 'current': current, 'voltage': voltage, 'power': power, 'energy': energy})

# Normalize data
scaler = StandardScaler()
data[['current', 'voltage', 'power', 'energy']] = scaler.fit_transform(data[['current', 'voltage', 'power', 'energy']])

# Thresholds
current_threshold = np.mean(current) + 1.5 * np.std(current)
voltage_threshold = np.mean(voltage) + 1.5 * np.std(voltage)
energy_threshold = np.mean(energy) + 1.5 * np.std(energy)

# Overflow detection
data['current_overflow'] = np.where(data['current'] > current_threshold, 1, 0)
data['voltage_overflow'] = np.where(data['voltage'] > voltage_threshold, 1, 0)
data['energy_overflow'] = np.where(data['energy'] > energy_threshold, 1, 0)

# Features and labels
X = data[['current', 'voltage', 'power', 'energy']]
y_current = data['current_overflow']
y_voltage = data['voltage_overflow']
y_energy = data['energy_overflow']

# Split data
X_train, X_test, y_train_current, y_test_current = train_test_split(X, y_current, test_size=0.2, random_state=42)
_, _, y_train_voltage, y_test_voltage = train_test_split(X, y_voltage, test_size=0.2, random_state=42)
_, _, y_train_energy, y_test_energy = train_test_split(X, y_energy, test_size=0.2, random_state=42)

# Train models
rf_current = RandomForestRegressor(n_estimators=100, random_state=42)
rf_voltage = RandomForestRegressor(n_estimators=100, random_state=42)
rf_energy = RandomForestRegressor(n_estimators=100, random_state=42)

rf_current.fit(X_train, y_train_current)
rf_voltage.fit(X_train, y_train_voltage)
rf_energy.fit(X_train, y_train_energy)

# Predictions
current_pred = rf_current.predict(X_test)
voltage_pred = rf_voltage.predict(X_test)
energy_pred = rf_energy.predict(X_test)

# Binary predictions
current_pred_binary = (current_pred > 0.5).astype(int)
voltage_pred_binary = (voltage_pred > 0.5).astype(int)
energy_pred_binary = (energy_pred > 0.5).astype(int)

# Accuracy
current_accuracy = accuracy_score(y_test_current, current_pred_binary) * 100
voltage_accuracy = accuracy_score(y_test_voltage, voltage_pred_binary) * 100
energy_accuracy = accuracy_score(y_test_energy, energy_pred_binary) * 100

print(f"Current Overflow Prediction Accuracy: {current_accuracy:.2f}%")
print(f"Voltage Overflow Prediction Accuracy: {voltage_accuracy:.2f}%")
print(f"Energy Overflow Prediction Accuracy: {energy_accuracy:.2f}%")

# Anomaly Detection
iso_forest = IsolationForest(contamination=0.05, random_state=42)
anomalies = iso_forest.fit_predict(X[['current', 'voltage']])
anomaly_scores = iso_forest.decision_function(X[['current', 'voltage']])
probability_anomalies = 1 / (1 + np.exp(-anomaly_scores))
anomaly_probabilities_percentage = probability_anomalies * 100
data['anomaly_probability'] = anomaly_probabilities_percentage

# Plotting (optional)
plt.figure(figsize=(10, 6))
plt.plot(data['time'], data['current'], label='Current', color='blue')
plt.plot(data['time'], data['voltage'], label='Voltage', color='green')
plt.scatter(data['time'], data['current'], c=data['anomaly_probability'], cmap='coolwarm', label='Anomaly Probability', s=20)
plt.colorbar(label='Anomaly Probability (%)')
plt.legend()
plt.title('Anomalies in Current & Voltage with Probability')
plt.xlabel('Time')
plt.ylabel('Value')
plt.show()

# FastAPI setup
app = FastAPI()

# Pydantic model
class AnomalyData(BaseModel):
    time: int
    current: float
    voltage: float
    anomaly_probability: float

# GET all anomalies
@app.get("/anomalies", response_model=List[AnomalyData])
def get_all_anomalies():
    result = data[['time', 'current', 'voltage', 'anomaly_probability']].to_dict(orient='records')
    return result

# GET anomaly by time
@app.get("/anomalies/{time}", response_model=Optional[AnomalyData])
def get_anomaly_by_time(time: int):
    row = data[data['time'] == time]
    if row.empty:
        return None
    result = row[['time', 'current', 'voltage', 'anomaly_probability']].iloc[0].to_dict()
    return result

# POST all anomalies
@app.post("/anomaliespost", response_model=List[AnomalyData])
def post_anomalies(anomalies: List[AnomalyData] = Body(...)):
    
    print(f"Received {len(anomalies)} anomalies")
    for anomaly in anomalies:
        print(anomaly)
    return anomalies

# Entry point
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
