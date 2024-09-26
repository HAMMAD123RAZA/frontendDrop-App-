import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import {useDispatch} from 'react-redux'
import { addToCart } from '../../rtk/CartSlice'

const DetScreenPage = ({data}) => {
    const {width}=Dimensions.get('window')
    const dispatch=useDispatch()

    const handleATC=()=>{
dispatch(addToCart({
    id:data?._id,
    name:data?.name,
    image:data?.image,
    price:data?.price,
    quantity:1
}))

    }

  return (
    <View>
        <Image source={{uri:data?.image}} width={width} height={240} />
        <View className='px-4 pt-4' >
        <Text className='font-bold text-2xl ' >{data?.name}</Text>
        <Text className='py-2 text-gray-400 font-bold ' >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia atque, maxime quam, consequuntur enim eligendi suscipit quose cum dignissimos alias sint</Text>

    <View className='flex-row items-center justify-between' >
        <View>
            <Text className='font-bold text-gray-400 text-lg ' >Total Pice</Text>
            <Text className='font-bold text-lg ' >{data?.price} pkr</Text>
        </View>
    <TouchableOpacity onPress={handleATC} className='px-5 py-3 bg-blue-500 rounded-3xl m-3 '  >
    <Text className='text-white font-bold' >Add To Cart</Text>
    </TouchableOpacity>
    </View>

        </View>
    </View>
  )
}

export default DetScreenPage