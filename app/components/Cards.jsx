import { View, FlatList, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import CardUi from '../card/CardUi'
import axios from 'axios'


const Cards = () => {
    const [data, setData] = useState([])
    const [error, setError] = useState(null)

    const filterData=data.filter(item=>item.category=="gallon" || item.category=="bottle")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://192.168.100.10:8080/get`);
                setData(response.data)  
            } catch (err) {
                setError(err.message)  
                console.error("API fetch error: ", err)
            }
        }
        fetchData()
    }, [])  

    const renderItem = ({ item }) => (
        <View key={item._id}>
            <CardUi item={item} /> 
        </View>
    )
    
    return (
        <View>
            {error ? (
                <Text>Error: {error}</Text> 
            ) : (
                <FlatList 
                    data={filterData} 
                    renderItem={renderItem} 
                    keyExtractor={(item, index) => index.toString()}
                    horizontal 
                    showsHorizontalScrollIndicator={false} 
                />
            )}
        </View>
    )
}

export default Cards