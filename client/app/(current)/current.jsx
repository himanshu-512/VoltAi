import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
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

// Tank Display Component
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

const Current = () => {
  const router = useRouter();
  const [sensorData, setSensorData] = useState({
    load1: 0,
    load2: 0,
    load3: 0,
    load4: 0,
  });
  console.log("sensorData", sensorData);
  const [relayStatus, setRelayStatus] = useState({});
  const maxHeight = 200;

  const animatedValues = {
    load1: useSharedValue(0),
    load2: useSharedValue(0),
    load3: useSharedValue(0),
    load4: useSharedValue(0),
  };

  // Listen for sensor data
  useEffect(() => {
    const updateSensorData = (data) => {
      setSensorData({
        load1: Number(parseFloat(data.load_I1).toFixed(4)),
        load2: Number(parseFloat(data.load_I2).toFixed(4)),
        load3: Number(parseFloat(data.load_I3).toFixed(4)),
        load4: Number(parseFloat(data.load_I4).toFixed(4)),
      });
    };

    socket.on("particular-data", updateSensorData);
    return () => socket.off("particular-data", updateSensorData);
  }, []);

  // Listen for relay data (safe/unsafe)
  useEffect(() => {
    const handleRelayData = (data) => setRelayStatus(data);
    socket.on("relay-data", handleRelayData);
    return () => socket.off("relay-data", handleRelayData);
  }, []);

  // Animate tank fill
  useEffect(() => {
    Object.keys(sensorData).forEach((key) => {
      const scaleFactor = 0.07;
      animatedValues[key].value = withTiming(
        maxHeight * (sensorData[key] / scaleFactor),
        {
          duration: 500,
          easing: Easing.inOut(Easing.ease),
        }
      );
    });
  }, [sensorData]);

  // Tank data for dynamic rendering
  const tankData = [
    { key: "load1", label: "Load 1", unit: "A", path: "/load1" },
    { key: "load2", label: "Load 2", unit: "A", path: "/load2" },
    { key: "load3", label: "Load 3", unit: "A", path: "/load3" },
    { key: "load4", label: "Load 4", unit: "A", path: "/load4" },
  ];

  // Get unsafe loads
  const getUnsafeLoads = () => {
    if (!relayStatus) return [];
    return Object.entries(relayStatus)
      .filter(([_, value]) => value === false)
      .map(([key]) => key.toUpperCase());
  };
  return (
    <SafeAreaView className="flex-1 bg-[#14181B]">
      <ScrollView>
        {/* Header */}
        <View className="h-[50px] flex-row justify-center items-center w-full bg-[#444444] rounded-b-2xl">
          <Text className="text-xl text-white font-bold">Current Info</Text>
        </View>

        {/* Buttons */}
        <View className="flex-row mt-10 justify-evenly gap-4">
          <CustomButton
            title="Value"
            onPress={() => console.log("Value button pressed")}
          />
          <CustomButton
            title="Graph"
            onPress={() => router.push("/currentGraph")}
            bgColor="bg-blue-500"
          />
        </View>

        {/* Tanks */}
        <View className="flex flex-row items-center justify-evenly h-[320px] w-[90%] mt-10 ml-4 bg-[#14181B] rounded-3xl">
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

        {/* Anomaly Detection */}
        <Text className="text-xl text-white font-bold mt-10 ml-4">
          Anomaly Detection
        </Text>
        <View className="flex flex-row items-center justify-evenly h-[220px] w-[90%] mt-4 ml-4 bg-[#444444] rounded-3xl">
          <View className="flex flex-row items-center justify-between w-[90%]">
            <Text className="text-xl text-white font-bold text-[#F9DC75]">
              {getUnsafeLoads().length > 0
                ? `UnSafe IN ${getUnsafeLoads().join(", ")}`
                : "All Loads Safe"}
            </Text>
            <Image
              source={require("../../assets/images/al.png")}
              style={{ width: 100, height: 50 }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Current;
