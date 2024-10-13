import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import axios from 'axios'
import DetScreenPage from './DetScreenPage'
import CustomHeader from '../components/CustomHeader'
import RelatedItem from '../components/RelatedItem'

const DetailScreen = () => {
    const { id } = useLocalSearchParams()  
    const [data, setData] = useState(null)  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://192.168.0.2:8080/get/${id}`);
                console.log(response.data)
                setData(response.data?.data) 
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [id])  

    return (
        <View>
            {/* header */}
            <CustomHeader title='Detail Item' />
            {/* detail */}
            {data ? (  
                <DetScreenPage data={data} />  
            ) : (
                <Text>No Data Available</Text>
            )}

            {/* You May Also Like */}
    <Text className='font-bold text-xl pt-1  pl-4 text-gray-400' >Related</Text>
<RelatedItem cat={data?.category} id={id}  />
        </View>
    )
}

export default DetailScreen