import { View, Text } from 'react-native'
import { Stack } from 'expo-router'
import React from 'react'

const Volltagelayout = () => {
  return (
   <Stack>
    <Stack.Screen name="voltage" options={{headerShown:false}}/>
   </Stack>
  )
}

export default Volltagelayout