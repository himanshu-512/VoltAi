import { Link } from "expo-router";
import { Pressable, Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="h-full items-center justify-evenly  bg-[#201E1E]">
      <View className="  w-full  ">
        <Text style={{fontFamily:"Poppins-Bold"}} className="text-7xl  text-center  text-[#F9DC75]">
          Welcome!
        </Text>
      </View>
      <View className=" h-[200px] w-[50%] items-center justify-center rounded-full  ">
        <Image
          source={require("../assets/images/logo.png")}
          className="h-[500px] w-[500px] mt-10"
          resizeMode="contain"
          style={{}}
        />
      </View>

      <TouchableOpacity className="h-[60px] w-[90%] items-center justify-center rounded-full ">
        <Link href={"/sigh-up"}>
          <View
            style={{ border: "1px solid #444444" }}
            className="h-[60px] w-[90%] items-center justify-center rounded-full bg-[#444444]"
          >
            <Text style={{fontFamily:"Poppins-semiBold"}} className="text-3xl  text-[#F9DC75]">
              Continue
            </Text>

            <Image
              source={require("../assets/images/arrow.png")}
              className="absolute right-5 h-[30px] w-[30px] rotate-[-180deg]"
            />
          </View>
        </Link>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
