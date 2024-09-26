import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

const Category = () => {

    const cat=[
        {
            id:1,
            category:"Gallon"
        },
        {
            id:2,
            category:"Mini Bottle"
        }, {
            id:3,
            category:"Bottle"
        }, {
            id:4,
            category:"Tanker"
        },
    ]

const router=useRouter()
    const renderItem=({item})=>{
        return (
            <View key={item.id} className='px-5 py-3 bg-blue-500 rounded-3xl m-4' >
                <TouchableOpacity      onPress={()=>router.push('/category/'+item?.category)} >
                    <Text className=' text-white font-bold'>{item.category}</Text>
                </TouchableOpacity>
            </View>
        )
    }
 
  return (
    <View>
        <FlatList data={cat} renderItem={renderItem} horizontal showsHorizontalScrollIndicator={false} />
    </View>
  )
}

export default Category


