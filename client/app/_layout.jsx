import { Stack } from "expo-router";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import "../global.css"


export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (error) {
      console.error(error);
    }
    if (fontsLoaded) SplashScreen.hideAsync();
    // Asset.loadAsync([require("../assets/logotype.png")]);

    if (!fontsLoaded) SplashScreen.preventAutoHideAsync();

  }, [fontsLoaded, error]);
  return <Stack>
    <Stack.Screen name="index" options={{ headerShown: false,statusBarHidden: true }} />
    <Stack.Screen name="(tabs)" options={{headerShown:false,statusBarHidden: true}}/>
    {/* <Stack.Screen name="(tabs)/home" options={{headerShown:false}}/> */}
    <Stack.Screen name="(auth)" options={{headerShown:false,statusBarHidden: true}}/>
    <Stack.Screen name="(current)" options={{headerShown:false,statusBarHidden: true}}/>
    <Stack.Screen name="(volltage)" options={{headerShown:false,statusBarHidden: true}}/>
    <Stack.Screen name="(energy)" options={{headerShown:false,statusBarHidden: true}}/>
  </Stack>
}
