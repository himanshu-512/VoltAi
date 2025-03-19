import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomBtn = ({title, containerStyles, textStyles, handlePress, isLoading}) => {
  return (
    <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        
        className={`bg-[#444444] border-2 border-[#FFFBFB] rounded-xl min-h-[50px] ${containerStyles} ${isLoading? 'opacity-50' : '' } justify-center mt-4  items-center `}>
            <Text style={{fontFamily:"Poppins-Bold"}} className={`text-[#F9DC75] ${textStyles}  text-lg`}>{title}</Text>
        </TouchableOpacity>
  )
}

export default CustomBtn;