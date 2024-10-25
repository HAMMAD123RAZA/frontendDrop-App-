import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import axios from 'axios'

const Cat = () => {
    const { Cat } = useLocalSearchParams()  
    const [data, setdata] = useState([])
    const router=useRouter()
   
    useEffect(()=>{
        const fetchData=async()=>{
            try {
            const api=await axios.get('http://192.168.100.5:8080/get')
            const res=api.data
            setdata(res)
    
            } catch (error) {
             console.log(error)   
            }
        }
        fetchData()
    },[Cat])
    
    const filterData = data.filter((item) => item.category?.toLowerCase() === Cat.toLowerCase());

    const renderItem=({item})=>{
        return (
        <View className=''>
                <View className="rounded-2xl p-4 m-3 bg-white shadow-2xl" style={{ width: 160 }}>
      <TouchableOpacity onPress={() => router.push(`/detailScreen/${item?._id}`)}>
        <Image 
          source={{ uri: item?.image }} 
          className="rounded-xl mb-3" 
          style={{ width: 110, height: 90 }} 
        />
        <Text className="font-bold text-lg text-gray-800">{item?.name}</Text>
        <Text className="text-sm text-gray-500">{item?.category}</Text>
        <Text className="font-bold text-blue-600 text-lg pt-2">{item?.price} PKR</Text>
      </TouchableOpacity>
    </View>

        </View>
        )
    }

  return (
    <View className='py-5'>
      {/* <Text>{Cat}</Text> */}
      <FlatList data={filterData} numColumns={2} renderItem={renderItem} showsVerticalScrollIndicator={false}/>
    </View>
  )
}

export default Cat