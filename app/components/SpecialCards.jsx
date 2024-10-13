import { View, FlatList, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import CardUi from '../card/CardUi'
import axios from 'axios'
import { useRouter } from 'expo-router'

const SpecialCards = () => {
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const router=useRouter()
    const filterData=data.filter(item=>item.category=="Tanker")

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("Fetching data from API...");
                const response = await axios.get('http://192.168.100.10:8080/get');
                console.log("API response:", response.data);
                setData(response.data);  
            } catch (err) {
                setError(err.message);
                console.error("API fetch error: ", err);
            }
        };
        fetchData();
    }, []);
    
    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => router.push(`/detailScreen/${item?._id}`)}>
          <View key={item._id} className='flex-row bg-white p-3 rounded-xl shadow-md my-2 mx-4'>
            <Image
              source={{ uri: item?.image }}
              className="rounded-lg"
              style={{ width: 120, height: 120 }}
            />
            <View className='flex-1 ml-3'>
              <Text className="font-bold text-lg text-gray-800">{item?.name}</Text>
              <Text className="text-sm text-gray-500">{item?.category}</Text>
              <Text className="text-sm text-gray-600 mt-2" numberOfLines={2} ellipsizeMode="tail">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, repudiandae dolor quibusdam est rerum quae repellendus accusantium molestiae quam omnis laborum?
              </Text>
              <Text className="font-bold text-blue-600 text-lg pt-2">{item?.price} PKR</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
          
    return (

        <View>
            <Text className='pl-7 font-bold text-xl py-2 text-blue-500' >Special For You</Text>
            {error ? (
                <Text>Error: {error}</Text> 
            ) : (
                <FlatList 
                    data={filterData} 
                    renderItem={renderItem} 
                    keyExtractor={(item, index) => index.toString()}
                    // numColumns={2}
                    />
            )}
        </View>
    )
}

export default SpecialCards