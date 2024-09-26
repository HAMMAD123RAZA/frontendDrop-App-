import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

const CardUi = ({ item }) => {
  const router = useRouter()
  const { _id, image, name, category, price } = item  
  console.log(image+" "+name +" "+price)
  return (
    <View className="rounded-2xl p-4 m-3 bg-white shadow-2xl" style={{ width: 160 }}>
      <TouchableOpacity onPress={() => router.push(`/detailScreen/${_id}`)}>
        <Image 
          source={{ uri: image }} 
          className="rounded-xl mb-3" 
          style={{ width: 110, height: 90 }} 
        />
        <Text className="font-bold text-lg text-gray-800">{name}</Text>
        <Text className="text-sm text-gray-500">{category}</Text>
        <Text className="font-bold text-blue-600 text-lg pt-2">{price} PKR</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CardUi