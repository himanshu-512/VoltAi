import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomTank from "../../components/CustomTank";
import { Easing, useSharedValue, withTiming } from "react-native-reanimated";
import Graphs from "../../components/Graphs";
import socket from "../../config/sokite";
import { useRouter } from "expo-router";

const Home = () => {
  const router = useRouter();
  const maxHeight = 200; // Maximum tank height

  // Shared animated values for smooth transitions
  const animatedValues = {
    current: useSharedValue(0),
    voltage: useSharedValue(0),
    energy: useSharedValue(0),
  };

  // Sensor data state
  const [sensorData, setSensorData] = useState({
    current: 1,
    voltage: 2,
    energy: 1,
  });

  // Socket listener for real-time data
  useEffect(() => {
    const updateSensorData = (data) => {
      setSensorData({
        current: Number(parseFloat(data.current).toFixed(2)),
        voltage: Number(parseFloat(data.voltage).toFixed(2)),
        energy: Number(parseFloat(data.energy).toFixed(2)),
      });
    };

    socket.on("sensor-data1", updateSensorData);
    return () => socket.off("sensor-data1", updateSensorData);
  }, []);

  // Update animation when sensor data changes
  useEffect(() => {
    Object.keys(sensorData).forEach((key) => {
      let scaleFactor = key === "current" ? 1 : key === "voltage" ? 250 : 500;
      animatedValues[key].value = withTiming(maxHeight * (sensorData[key] / scaleFactor), {
        duration: 500,
        easing: Easing.inOut(Easing.ease),
      });
    });
  }, [sensorData]);
  console.log(sensorData);

  // Helper function to render CustomTank components
  const renderTank = (label, value, unit, path, animatedHeight) => (
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

  return (
    <SafeAreaView className="h-full w-full bg-[#201E1E]">
      <ScrollView>
        {/* Header Section */}
        <View className="h-[50px] flex flex-row gap-2 items-center w-full bg-[#444444] rounded-b-2xl">
          <Image
            source={require("../../assets/images/sf.png")}
            className="h-[40px] w-[40px] ml-2"
            resizeMode="contain"
            style={{ tintColor: "#FFFF" }}
          />
          <Text style={{ fontFamily: "Poppins-regular" }} className="text-lg text-[#FFFFFF]">
            WELCOME <Text className="font-bold text-[#F9DC75]">Himanshu Tyagi 👋</Text>
          </Text>
        </View>

        {/* Section Title */}
        <View className="flex flex-row justify-center mt-8 items-center w-full">
          <View className="h-[40px] items-center justify-center w-[50%] bg-[#444444] rounded-full">
            <Text style={{ fontFamily: "Poppins-regular" }} className="text-lg text-[#F9DC75]">
              LOAD & POWER
            </Text>
          </View>
        </View>

        {/* Tanks Display Section */}
        <View className="flex flex-row items-center justify-evenly h-[310px] w-[90%] mt-4 ml-4 bg-[#444444] rounded-3xl">
          {renderTank("Current", sensorData.current, "A", "/current", animatedValues.current)}
          {renderTank("Voltage", sensorData.voltage, "V", "/voltage", animatedValues.voltage)}
          {renderTank("Energy", sensorData.energy, "Wh", "/energy", animatedValues.energy)}
        </View>

        {/* Graph Section */}
        <Text style={{ fontFamily: "Poppins-medium" }} className="text-[20px] text-white mt-4 ml-4">
          Total Energy Monitoring
        </Text>
        <Graphs data={sensorData.energy} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
