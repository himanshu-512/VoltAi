import React from "react";
import { View, Text } from "react-native";
import Svg, { Rect, Defs, LinearGradient, Stop } from "react-native-svg";
import Animated, { useAnimatedProps } from "react-native-reanimated";
// import { rgbaColor } from "react-native-reanimated/lib/typescript/Colors";

const AnimatedRect = Animated.createAnimatedComponent(Rect);

const CustomTank = ({ current, animatedHeight, placeholder, unit, value1, otherStyle }) => {
  const animatedProps = useAnimatedProps(() => ({
    y: 160 - animatedHeight.value,
    height: animatedHeight.value,
  }));

  return (
    <View className={`items-center ${otherStyle} justify-center`}>
      {/* Outer container with rounded corners and white border */}
      <View
        style={{
          width: 100,
          height: 272,
          borderRadius: 30,
          backgroundColor: "#14181B",
          paddingVertical: 15,
          alignItems: "center",
          justifyContent: "space-between",
          borderWidth: 1.0,
          borderColor: "rgba(255, 255, 255, 0.2)",
        }}
      >
        {/* Lightning icon */}
        <Text style={{ fontSize: 20, color: "#FFB100",marginBottom: 5 }}>⚡</Text>

        {/* Capsule liquid tank */}
        <View
          style={{
            width: 70,
            height: 160,
            borderRadius: 35,
            borderWidth: 1,
            borderColor: "#333",
            justifyContent: "flex-end",
            overflow: "hidden",
            backgroundColor: "#1c1c1e",
          }}
        >
          <Svg width="70" height="160">
            <Defs>
              <LinearGradient id="orangeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <Stop offset="0%" stopColor="#FFB100" />
                <Stop offset="100%" stopColor="#FF8800" />
              </LinearGradient>
            </Defs>

            <AnimatedRect
              x="0"
              width="70"
              rx="35"
              animatedProps={animatedProps}
              fill="url(#orangeGradient)"
            />
          </Svg>
        </View>

        {/* Labels */}
        <Text style={{ color: "#ffffff", fontSize: 16 }}>{placeholder}</Text>
        <Text style={{ color: "#FFB100", fontSize: 20, fontWeight: "bold" }}>
          {value1} {unit}
        </Text>
      </View>
    </View>
  );
};

export default CustomTank;
