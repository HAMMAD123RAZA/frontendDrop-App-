import { View, FlatList, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import CardUi from '../card/CardUi'
import axios from 'axios'


const Cards = () => {
    const [data, setData] = useState([])
    const [error, setError] = useState(null)

    const filterData=data.filter(item=>item.category=="Gallon" || item.category=="Bottle" || item.category=="bottle" || item.category=="gallon")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const api=await axios.get('http://192.168.100.5:8080/get')
                setData(api.data)  
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