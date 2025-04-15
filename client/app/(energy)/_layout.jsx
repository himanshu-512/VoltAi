import { View, Text } from 'react-native'
import { Stack } from 'expo-router'
import React from 'react'

const Energylayout = () => {
  return (
   <Stack>
    <Stack.Screen name="energy" options={{headerShown:false}}/>
   </Stack>
  )
}

export default Energylayout