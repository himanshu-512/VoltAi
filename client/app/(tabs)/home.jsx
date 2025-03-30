import { View, Text, ScrollView, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomTank from "../../components/CustomTank";
import { Easing, useSharedValue, withTiming, useAnimatedProps } from "react-native-reanimated";
import Graphs from "../../components/Graphs";
import socket from "../../config/sokite";

const Home = () => {
  const [sensorData, setSensorData] = useState({ current: 1, voltage: 2, energy: 1 });
  const maxHeight = 200; // Maximum tank height

  // Shared animated values for smooth transitions
  const animatedHeight = useSharedValue(maxHeight * (sensorData.current / 100));
  const animatedHeight2 = useSharedValue(maxHeight * (sensorData.voltage / 100));
  const animatedHeight3 = useSharedValue(maxHeight * (sensorData.energy / 100));

  // Socket listener for real-time data
  useEffect(() => {
    socket.on("sensor-data1", (data) => {
      // console.log(data);
      const { voltage, current, power, totalEnergy } = data;
      const energyValue = totalEnergy;
      // console.log(energyValue);
      setSensorData({
        current: parseFloat(current).toFixed(2),
        voltage: parseFloat(voltage).toFixed(2),
        energy: parseFloat(energyValue).toFixed(2),
      });
    });
    return () => socket.off("sensor-data");
  }, []);
  console.log(sensorData);

  // Update animation when sensor data changes
  useEffect(() => {
    animatedHeight.value = withTiming(maxHeight * (sensorData.current / 4), {
      duration: 800,
      easing: Easing.inOut(Easing.ease),
    });
    animatedHeight2.value = withTiming(maxHeight * (sensorData.voltage / 250), {
      duration: 800,
      easing: Easing.inOut(Easing.ease),
    });
    animatedHeight3.value = withTiming(maxHeight * (sensorData.energy / 100), {
      duration: 800,
      easing: Easing.inOut(Easing.ease),
    });
  }, [sensorData]);

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
        <View className="flex flex-row items-center justify-evenly h-[300px] w-[90%] mt-8 ml-4 bg-[#444444] rounded-3xl">
          <CustomTank
            current={sensorData.current}
            maxHeight={250}
            animatedHeight={animatedHeight}
            placeholder={"Current"}
            value1={sensorData.current}
            unit={"A"}
            otherStyle={{ marginTop: 10 }}
          />
          <CustomTank
            current={sensorData.voltage}
            maxHeight={250}
            animatedHeight={animatedHeight2}
            placeholder={"Voltage"}
            value1={sensorData.voltage}
            unit={"V"}
          />
          <CustomTank
            current={sensorData.energy}
            maxHeight={250}
            animatedHeight={animatedHeight3}
            placeholder={"Energy"}
            value1={sensorData.energy}
            unit={"Wh"}
          />
        </View>

        {/* Graph Section */}
        <Text style={{ fontFamily: "Poppins-medium" }} className="text-[20px] text-white mt-4 ml-4">
          Total Energy Monitoring
        </Text>
        <Graphs 
        data={sensorData.energy}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
