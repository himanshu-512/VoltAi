import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Pressable,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import Inputfields from "../../components/inputfields";
import CustomBtn from "../../components/CustomBtn";
import React, { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setSubmitting] = useState(false);

  const handleChange = (key, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [key]: value,
    }));
  };

  const submit = async () => {
    if (!form.fullname || !form.email || !form.password) {
      Alert.alert("Validation Error", "All fields are required!");
      return;
    }

    setSubmitting(true);

    try {
      const response = await axios.post(
        "http://192.168.186.156:8009/api/v1/user/sign-up",
        form
      );
      console.log("Sign-up success:", response.data);
      Alert.alert("Success", "Account created successfully!");
      setForm({ fullname: "", email: "", password: "" });
      router.push("/login"); // redirect to login after signup
    } catch (error) {
      console.error("Sign-up error:", error.response?.data || error.message);
      Alert.alert("Sign-up Failed", error.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="h-full w-full bg-[#201E1E]">
      <ScrollView className="h-full w-full" contentContainerStyle={{ flexGrow: 1 }}>
        {/* Back Button */}
        <TouchableOpacity
          className="h-[40px] w-[40px] rounded-full bg-[#444444] mt-10 ml-4 items-center justify-center"
          accessibilityLabel="Go back"
          onPress={() => router.push("/")}
        >
          <Image
            source={require("../../assets/images/arrow.png")}
            className="h-[25px] w-[25px]"
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Title */}
        <View className="mt-20 ml-4 flex flex-row items-center">
          <Text style={{ fontFamily: "Poppins-semiBold" }} className="text-xl text-white">
            Sign Up To VoltAi
          </Text>
          <Image
            source={require("../../assets/images/logo2.png")}
            className="h-[50px] w-[50px] mx-[-10px]"
            resizeMode="contain"
          />
        </View>

        {/* Input Fields */}
        <View className="mt-10 ml-4 flex flex-col gap-2">
          <Inputfields
            title="Full Name"
            value={form.fullname}
            placeholder="Enter your full name"
            name={"fullname"}
            handleChangeText={(text) => handleChange("fullname", text)}
          />
          <Inputfields
            title="Email Address"
            placeholder="Enter your email address"
            value={form.email}
            name={"email"}
            handleChangeText={(text) => handleChange("email", text)}
          />
          <Inputfields
            title="Password"
            value={form.password}
            name={"password"}
            placeholder="Enter your password"
            handleChangeText={(text) => handleChange("password", text)}
            secureTextEntry={true}
          />
          <TouchableOpacity onPress={() => console.log("Forgot Password pressed")}>
            <Text style={{ fontFamily: "Poppins-semiBold" }} className="text-base text-[#F9DC75]">
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sign Up Button */}
        <View className="mt-10 ml-4 flex flex-col gap-2">
          <CustomBtn title="Sign Up" handlePress={submit} isLoading={isSubmitting} />
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
          <Text style={{ fontFamily: "Poppins-medium" }} className="text-[20px] text-white">
            Continue with Google
          </Text>
        </TouchableOpacity>

        {/* Already have an account link */}
        <TouchableOpacity className="mt-10 flex flex-row items-center justify-center">
          <Text style={{ fontFamily: "Poppins-medium" }} className="text-white">
            Already have an account?
          </Text>
          <Pressable onPress={() => router.push("/login")}>
            <Text className="text-[#F9DC75] font-bold ml-1">Login</Text>
          </Pressable>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
