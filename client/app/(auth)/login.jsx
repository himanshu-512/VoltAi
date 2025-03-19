import { View, Text, Image, Pressable, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Inputfields from "../../components/inputfields";
import CustomBtn from "../../components/CustomBtn";
import { router } from "expo-router";

const Login = () => {
  return (
    <SafeAreaView className="h-full w-full bg-[#201E1E]">
      <ScrollView className="h-full w-full" contentContainerStyle={{ flexGrow: 1 }}>
        
        {/* Back Button */}
        <TouchableOpacity
          className="h-[40px] w-[40px] rounded-full bg-[#444444] mt-10 ml-4 items-center justify-center"
          accessibilityLabel="Go back"
          onPress={() => console.log("Back pressed")}
        >
          <Image
            source={require("../../assets/images/arrow.png")}
            className="h-[25px] w-[25px]"
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Title */}
        <View className="mt-20 ml-4 flex flex-row items-center">
          <Text style={{fontFamily:"Poppins-semiBold"}} className="text-xl  text-white">Login To VoltAi</Text>
          <Image
            source={require("../../assets/images/logo2.png")}
            className="h-[50px] w-[50px] mx-[-10px]"
            resizeMode="contain"
          />
        </View>

        {/* Input Fields */}
        <View className="mt-10 ml-4 flex flex-col gap-2">
          <Inputfields title="Email Address" placeholder="Enter your email address" />
          <Inputfields title="Password" placeholder="Enter your password" />
          <TouchableOpacity onPress={() => console.log("Forgot Password pressed")}>
            <Text style={{fontFamily:"Poppins-semiBold"}} className="text-base text-[#F9DC75] ">Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <View className="mt-10 ml-4 flex flex-col gap-2">
          <CustomBtn
            title="Login"
            handlePress={() => router.push("/home")}
            isLoading={false}
          />
        </View>

        {/* OR Divider */}
        <View className="h-[50px] flex flex-row items-center justify-between mt-20 w-full px-4">
          <View className="h-[1px] bg-white flex-1" />
          <Text className="text-base text-white font-bold mx-4">OR</Text>
          <View className="h-[1px] bg-white flex-1" />
        </View>

        {/* Google Sign In */}
        <TouchableOpacity
          className="h-[50px] flex flex-row items-center gap-4 rounded-full mt-10 w-[90%] mx-auto bg-[#282424] border-2 border-[#444444]"
          onPress={() => console.log("Google Login pressed")}
        >
          <Image
            source={require("../../assets/images/google.png")}
            className="h-[30px] w-[30px] ml-4"
            resizeMode="contain"
          />
          <Text style={{fontFamily:"Poppins-medium"}} className="text-[20px] text-white ">Continue with Google</Text>
        </TouchableOpacity>

        {/* Sign Up Link */}
        <TouchableOpacity className="mt-10 flex flex-row items-center justify-center">
          <Text style={{fontFamily:"Poppins-medium"}} className="text-white ">Don’t have an account?</Text>
          <Pressable onPress={() => console.log("Sign Up pressed")}>
            <Text className="text-[#F9DC75] font-bold ml-1">Sign up</Text>
          </Pressable>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
