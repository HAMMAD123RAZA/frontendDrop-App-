import { View, FlatList, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import CardUi from '../card/CardUi'
import axios from 'axios'

const SpecialCards = () => {
    const [data, setData] = useState([])
    const [error, setError] = useState(null)

    const filterData=data.filter(item=>item.category=="Tanker")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://192.168.0.103:8080/get');
                // console.log(response.data)
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
            <Text className='pl-4 font-bold text-xl text-blue-500' >Special For You</Text>
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