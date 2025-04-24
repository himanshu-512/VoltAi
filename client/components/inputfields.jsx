import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";

const Inputfields = ({
  title,
  value,
  placeholder,
  handleChangeText,
  name,
  icons,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View class name={`flex flex-col gap-2 ${otherStyles}`}>
    <Text className="text-base  text-gray-100 font-bold">{title}</Text>
    <View className="w-full mt-1 h-16 px-4  border-2 border-[#444444] drop-shadow-lg bg-gray-800 rounded-2xl focus:border-yellow-400 items-center flex flex-row">
      <TextInput
        className="flex-1 text-white  text-base"
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#7B7B8B"
        name={name}
        onChangeText={handleChangeText}
        style={{ fontFamily: "Poppins-semiBold" }}
        secureTextEntry={title === "Password" && !showPassword}
        {...props}
      />
       {title === "Password" && (
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Image
            source={!showPassword ? require("../assets/images/view.png"):require("../assets/images/hide.png")}
            className="w-6 h-6"
            tintColor={"#7B7B8B"}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}

    </View>
  </View>
  );
};

export default Inputfields;
