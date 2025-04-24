# Import Libraries
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt
import joblib

# Step 1: Load and Preprocess Data
# Load dataset (replace 'load_data.csv' with your dataset)
data = pd.read_csv('load_data.csv')

# Feature Engineering
data['timestamp'] = pd.to_datetime(data['timestamp'])
data['hour'] = data['timestamp'].dt.hour
data['day'] = data['timestamp'].dt.day
data['month'] = data['timestamp'].dt.month

# Features and Target
X = data[['voltage', 'current', 'power', 'hour', 'day', 'month']]
y = data['label']

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Standardize features
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Step 2: Train a Machine Learning Model
# Train Random Forest model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Predict on test data
y_pred = model.predict(X_test)

# Evaluate the model
print("Accuracy:", accuracy_score(y_test, y_pred))
print("Classification Report:\n", classification_report(y_test, y_pred))

# Step 3: Predict Overflow Current, Overflow Voltage, and Overconsumption
# Define thresholds for overflow conditions
current_threshold = 10.0  # Example threshold for current overflow
voltage_threshold = 240.0  # Example threshold for voltage overflow
energy_threshold = 5000.0  # Example threshold for energy overconsumption

# Predict anomalies
anomalies = model.predict(X_test)

# Check for overflow conditions
for i in range(len(X_test)):
    if anomalies[i] == 1:
        print(f"Anomaly detected at index {i}")
    if X_test[i][1] > current_threshold:  # Check current overflow
        print(f"Overflow current detected at index {i}")
    if X_test[i][0] > voltage_threshold:  # Check voltage overflow
        print(f"Overflow voltage detected at index {i}")
    if X_test[i][2] > energy_threshold:  # Check energy overconsumption
        print(f"Overconsumption of energy detected at index {i}")

# Step 4: Visualize Results
# Plot anomalies
plt.figure(figsize=(10, 6))
plt.scatter(range(len(y_test)), y_test, c='blue', label='Normal')
plt.scatter(np.where(anomalies == 1), y_test[anomalies == 1], c='red', label='Anomaly')
plt.title('Anomaly Detection')
plt.xlabel('Samples')
plt.ylabel('Label')
plt.legend()
plt.show()

# Step 5: Save the Model
# Save the trained model for future use
joblib.dump(model, 'anomaly_detection_model.pkl')
print("Model saved as 'anomaly_detection_model.pkl'")