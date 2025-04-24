import { View, Text,Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

const TabLayout = () => {
  const TabIcon = ({ source,style, color,name, focused }) => {
    return (
      <View className="flex items-center justify-center gap-1 mt-8 ">
        <Image
          source={source}
          resizeMode="contain"
          style={{ tintColor: color, width: 30, height: 50 }}
        />
         <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-[10px] leading-[12px] text-center`}
        style={{ color: color, }}
      >
        {name}
      </Text>
      </View>
    );
  };
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FFA001",
        tabBarInactiveTintColor: "#CDCDE0",
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#333333",
          borderTopWidth: 1,
          borderTopColor: "#232533",
          height: 70,
        },
      }}
    >
      <Tabs.Screen name="anomaly" options={{ 
        headerShown: false,
        headerStatusBarHidden: true,
        title: "Anomaly",
        tabBarIcon: ({ color, focused }) => (
          <TabIcon
          source={require("../../assets/images/bug.png")}
          color={color}
          name="Anomaly"
          focused={focused}
          />
        )
       }} />
      <Tabs.Screen name="home" options={{ 
        headerShown: false,
        headerStatusBarHidden: true,
        title: "home",
        tabBarIcon: ({ color, focused }) => (
          <TabIcon
          source={require("../../assets/images/home1.png")}
          color={color}
          name="Home"
          focused={focused}
          />
        )
       }} />
        <Tabs.Screen name="graphs" options={{ 
        headerShown: false,
        title: "Graphs",
        tabBarIcon: ({ color, focused }) => (
          <TabIcon
          source={require("../../assets/images/ff.png")}
          color={color}
          name="Graphs"
          focused={focused}
          />
        )
       }} />
       <Tabs.Screen name="profile" options={{ 
        headerShown: false,
        title: "Profile",
        tabBarIcon: ({ color, focused }) => (
          <TabIcon
          source={require("../../assets/images/profile12.png")}
          color={color}
          name="Graphs"
          focused={focused}
          />
        )
       }} />
        <Tabs.Screen name="setting" options={{ 
        headerShown: false,
        title: "Setting",
        tabBarIcon: ({ color, focused }) => (
          <TabIcon
          source={require("../../assets/images/settings50.png")}
          color={color}
          name="Graphs"
          focused={focused}
          />
        )
       }} />
    </Tabs>
  );
};

export default TabLayout;
