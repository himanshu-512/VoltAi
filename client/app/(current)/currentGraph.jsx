import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Pressable,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  StyleSheet,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import socket from "../../config/sokite";

const screenWidth = Dimensions.get("window").width;
const THRESHOLD = 1.5; // You can adjust the threshold for current
const DATA_POINTS = 10;

// ✅ Reusable Graph Component (now uses current instead of energy)
const Graphs = ({ loadId }) => {
  const [chartData, setChartData] = useState({
    labels: Array.from({ length: DATA_POINTS }, () => "--"),
    current: Array(DATA_POINTS).fill(0),
  });

  useEffect(() => {
    const socketEvent = `particular-data${loadId}`;

   
    const listener = (data) => {
      const { current } = data;
      const currentValue = current ?? 0;

      const now = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

      setChartData((prev) => ({
        labels: [...prev.labels.slice(1), now],
        current: [...prev.current.slice(1), parseFloat(currentValue)],
      }));
    };

    socket.on(socketEvent, listener);
    return () => socket.off(socketEvent, listener);
  }, [loadId]);
  console.log("data in p graph", chartData);

  return (
    <View style={styles.container}>
      <LineChart
        data={{
          labels: chartData.labels.map((label, index) =>
            index % 2 === 0 ? label : ""
          ),
          datasets: [
            {
              data: chartData.current,
              color: (opacity = 1) => `rgba(247, 250, 248, ${opacity})`,
              strokeWidth: 3,
            },
            {
              data: Array(DATA_POINTS).fill(THRESHOLD),
              color: () => `rgba(255, 0, 0, 1)`,
              strokeWidth: 2,
            },
          ],
        }}
        width={screenWidth - 20}
        height={300}
        yAxisSuffix=" A"
        chartConfig={{
          backgroundColor: "#444444",
          backgroundGradientFrom: "#444444",
          backgroundGradientTo: "#444444",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(249, 220, 117, ${opacity})`,
          propsForDots: { r: "2", strokeWidth: "2", stroke: "#75f987" },
        }}
        bezier
        style={{ borderRadius: 10 }}
      />
      <Text style={styles.thresholdText}>
        Threshold Barrier ({THRESHOLD} A)
      </Text>
    </View>
  );
};

// ✅ Reusable Button
const CustomButton = ({ title, onPress, bgColor = "bg-red-500" }) => (
  <TouchableOpacity>
    <Pressable onPress={onPress}>
      <View
        className={`h-11 w-[100px] rounded-full ${bgColor} justify-center items-center`}
      >
        <Text className="text-white font-semibold">{title}</Text>
      </View>
    </Pressable>
  </TouchableOpacity>
);

// ✅ Main Screen
const CurrentGraph = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#201E1E]">
      <ScrollView>
        {/* Header */}
        <View className="h-[50px] flex-row justify-center items-center w-full bg-[#444444] rounded-b-2xl">
          <Text className="text-xl text-white font-bold">Current Info</Text>
        </View>

        {/* Buttons Section */}
        <View className="flex-row mt-10 justify-evenly gap-4">
          <CustomButton
            title="Value"
            onPress={() => console.log("Value button pressed")}
          />
          <CustomButton
            title="Graph"
            onPress={() => console.log("Graph button pressed")}
            bgColor="bg-blue-500"
          />
        </View>

        {/* Load Graphs */}
        {[1, 2, 3, 4].map((load) => (
          <View key={load}>
            <Text className="text-white text-2xl text-center font-bold mt-4">
              Load {load}
            </Text>
            <Graphs loadId={load} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

// ✅ Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#444444",
    borderRadius: 30,
    margin: 15,
  },
  thresholdText: {
    color: "white",
    fontSize: 12,
    position: "absolute",
    top: 0,
    right: 30,
  },
});

export default CurrentGraph;
