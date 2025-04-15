import { View, Text } from 'react-native'
import { Stack } from 'expo-router'
import React from 'react'

const Currentlayout = () => {
  return (
   <Stack>
    <Stack.Screen name="current" options={{headerShown:false}}/>
   </Stack>
  )
}

export default Currentlayout