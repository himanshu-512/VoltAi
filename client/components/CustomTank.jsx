import React from "react";
import { View, Text } from "react-native";
import Svg, { Rect, Defs, LinearGradient, Stop } from "react-native-svg";
import Animated, { useAnimatedProps } from "react-native-reanimated";

const AnimatedRect = Animated.createAnimatedComponent(Rect);

const CustomTank = ({ current, animatedHeight,placeholder,unit,value1,otherStyle }) => {
  const animatedProps = useAnimatedProps(() => ({
    y: 200 - animatedHeight.value,
    height: animatedHeight.value,
  }));

  return (
    <View className={`items-center ${otherStyle} justify-center `}>
      {/* Outer glowing capsule shape */}
      <View
        style={{
          width: 80,
          height: 230,
          borderRadius: 40,
          borderWidth: 2,
          borderColor: "white",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#444444",
          shadowColor: "#FFB100",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 1,
          shadowRadius: 15,
          marginTop: 20,
          elevation: 10,
        }}
      >
        <Svg width="60" height="200">
          <Defs>
            {/* Orange gradient fill */}
            <LinearGradient id="orangeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#FFB100" />
              <Stop offset="100%" stopColor="#FF8800" />
            </LinearGradient>
          </Defs>

          {/* Animated glowing liquid */}
          <AnimatedRect
            x="0"
            width="60"
            animatedProps={animatedProps}
            fill="url(#orangeGradient)"
            rx="30"
          />
        </Svg>
      </View>

      {/* Current Label */}
      <Text className="text-white mt-4 text-lg font-semibold">{placeholder}</Text>
      <Text className="text-yellow-400 text-2xl font-bold">{value1} {unit}</Text>
    </View>
  );
};

export default CustomTank;
