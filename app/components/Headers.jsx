import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useSelector } from 'react-redux'

const Headers = () => {
  const router=useRouter()
  const item=useSelector(state=>state.cart.items)
  return (

<View>
    <View className='flex-row justify-between px-4 pb-2 pt-10' >
      <Text className='text-blue-500 font-bold text-2xl'>DROPIFY</Text>

      <TouchableOpacity className='relative'  onPress={()=>router.push('/components/MyCart')} >
      <Ionicons name='cart-sharp' size={32} color='blue' />
    <Text className='absolute right-5 bottom-6 font-bold text-blue-500 '>{item.length}</Text>
      </TouchableOpacity>

    </View>
    <View className='flex-row gap-4 mx-6 my-2 p-4 rounded-lg bg-white' >
        <Ionicons name='search' size={28} />
    <TextInput placeholder='enter here' style={{flex:1}} />
    <Ionicons name='options' size={32} color='blue' />

    </View>
        </View>
  )
}

export default Headers