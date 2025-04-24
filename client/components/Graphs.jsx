import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";
import socket from "../config/sokite"; // ✅ Ensure socket is properly imported

const screenWidth = Dimensions.get("window").width;
const THRESHOLD = 40;
const DATA_POINTS = 10; // ✅ Control how many points are displayed

const Graphs = () => {
  const [chartData, setChartData] = useState({
    labels: Array.from({ length: DATA_POINTS }, (_, i) => "--"),
    energy: Array(DATA_POINTS).fill(0),
  });

  useEffect(() => {
    socket.on("sensor-data1", (data) => {
       console.log("Received data in graph:", data);
  
      const { voltage, current, power, energy } = data; // Ensure you're getting totalEnergy properly
      const energyValue = power ?? 0; 
  
      // console.log("Energy Value:", energyValue);
  
      const now = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
  
      setChartData((prev) => ({
        labels: [...prev.labels.slice(1), now],
        energy: [...prev.energy.slice(1), parseFloat(energyValue)], // ✅ Ensure 2 decimals
      }));
    });
  
    return () => socket.off("sensor-data1"); // ✅ Clean up socket listener
  }, []);
  

  return (
    <View style={styles.container}>
      <LineChart
        data={{
          labels: chartData.labels.map((label, index) => (index % 2 === 0 ? label : "")),
          datasets: [
            {
              data: chartData.energy,
              color: (opacity = 1) => `rgba(247, 250, 248, ${opacity})`,
              strokeWidth: 3,
            },
            {
              data: Array(DATA_POINTS).fill(THRESHOLD),
              color: () => `rgba(134, 199, 199, 1)`,
              strokeWidth: 2,
            },
          ],
        }}
        width={screenWidth - 20}
        height={350}
        yAxisSuffix=" W"
        chartConfig={{
          backgroundColor: "#14181B",
          backgroundGradientFrom: "#14181B",
          backgroundGradientTo: "#14181B",
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(249, 220, 117, ${opacity})`,
          propsForDots: { r: "2", strokeWidth: "2", stroke: "#75f987" },
        }}
        bezier
        style={{ borderRadius: 10 }}
      />
      {/* <Text style={styles.thresholdText}>Threshold Barrier ({THRESHOLD} Wh)</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#444444",
    borderRadius: 30,
    margin: 11,
  },
  thresholdText: {
    color: "white",
    fontSize: 12,
    position: "absolute",
    top: 0,
    right: 30,
  },
});

export default Graphs;
