import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSharedValue, withTiming, Easing } from "react-native-reanimated";
import { useRouter } from "expo-router";
import CustomTank from "../../components/CustomTank";
import socket from "../../config/sokite";

// Custom Button Component
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

// RenderTank as functional component
const RenderTank = ({ label, value, unit, path, animatedHeight }) => {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.push(path)} activeOpacity={0.7}>
      <CustomTank
        current={value}
        maxHeight={250}
        animatedHeight={animatedHeight}
        placeholder={label}
        value1={value}
        unit={unit}
        otherStyle={{ marginTop: 10 }}
      />
    </TouchableOpacity>
  );
};

const Voltage = () => {
  const [sensorData, setSensorData] = useState({
    load1: 1,
    load2: 2,
    load3: 1,
    load4: 1,
  });

  const maxHeight = 200;
  const animatedValues = {
    load1: useSharedValue(0),
    load2: useSharedValue(0),
    load3: useSharedValue(0),
    load4: useSharedValue(0),
  };

  // Listen for sensor data updates
  useEffect(() => {
    const updateSensorData = (data) => {
      setSensorData({
        load1: Number(parseFloat(data.load1).toFixed(2)),
        load2: Number(parseFloat(data.load2).toFixed(2)),
        load3: Number(parseFloat(data.load3).toFixed(2)),
        load4: Number(parseFloat(data.load4).toFixed(2)),
      });
    };

    socket.on("sensor-data1", updateSensorData);
    return () => socket.off("sensor-data1", updateSensorData);
  }, []);

  // Update animated values when sensor data changes
  useEffect(() => {
    Object.keys(sensorData).forEach((key) => {
      const scaleFactor = 3.0; // Adjust based on your max values for tank fill
      animatedValues[key].value = withTiming(
        maxHeight * (sensorData[key] / scaleFactor),
        {
          duration: 500,
          easing: Easing.inOut(Easing.ease),
        }
      );
    });
  }, [sensorData]);

  const tankData = [
    { key: "load1", label: "Load 1", unit: "V", path: "/load1" },
    { key: "load2", label: "Load 2", unit: "V", path: "/load2" },
    { key: "load3", label: "Load 3", unit: "V", path: "/load3" },
    { key: "load4", label: "Load 4", unit: "V", path: "/load4" },
  ];

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

        {/* Tank Display Section */}
        <View className="flex flex-row items-center justify-evenly h-[320px] w-[90%] mt-10 ml-4 bg-[#444444] rounded-3xl">
          <FlatList
            data={tankData}
            horizontal
            contentContainerStyle={{ flexGrow: 1, gap: 30, marginLeft: 5 }}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <RenderTank
                label={item.label}
                value={sensorData[item.key]}
                unit={item.unit}
                path={item.path}
                animatedHeight={animatedValues[item.key]}
              />
            )}
          />
        </View>
        <Text className="text-xl text-white font-bold mt-10 ml-4">
          Anomaly Detection
        </Text>
        <View className="flex flex-row items-center justify-evenly h-[220px] w-[90%] mt-10 ml-4 bg-[#444444] rounded-3xl">
          <View className="flex flex-row items-center justify-center">
            <Text className="text-lg text-white font-bold">
              UnSafe IN Load1
            </Text>
          </View>
          <View className=" h-[2px] w-[55%] border-dotted bg-[#444444] border-[0.5px] rotate-[-90deg] fixed border-white "></View>
          <View></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Voltage;
