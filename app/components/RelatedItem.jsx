import { View, FlatList, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import CardUi from '../card/CardUi'
import axios from 'axios'

const RelatedItem = ({cat,id}) => {
    const [data, setData] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response=await axios.get('http://192.168.100.2:8080/get')
                const filter=response.data.filter(item=>item.category===cat && item._id!==id)
                setData(filter)  
            } catch (err) {
                setError(err.message)  
                console.error("Error in fetching from api:", err)
            }
        }
        fetchData()
    }, [cat,id])  

    const renderItem = ({ item }) => (
        <View key={item._id}>
            <CardUi item={item} /> 
        </View>
    )
    
    return (
        <View className='mb-4' >
            {error ? (
                <Text>Error: {error}</Text> 
            ) : (
                <FlatList 
                    data={data} 
                    renderItem={renderItem} 
                    keyExtractor={(item, index) => index.toString()}
                    horizontal 
                    showsHorizontalScrollIndicator={false} 
                />
            )}
        </View>
    )
}

export default RelatedItem