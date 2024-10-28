import { View, FlatList, Text, TextInput, TouchableOpacity, RefreshControl } from 'react-native';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import CardUi from '../card/CardUi';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import RBSheet from 'react-native-raw-bottom-sheet';

const explore = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState(null);
    const refRBSheet = useRef();
    const [refreshing, setrefreshing] = useState(false)

    const [selectedFilters, setSelectedFilters] = useState({
        price: null,
        category: null,
        litre: null,
    });

    const filterOptions = [
        {
            title: 'Price',
            values: ['100-500', '500-3000', '3000-10000'],
        },
        {
            title: 'Category',
            values: ['Bottle', 'Tanker', 'Gallon'],
        },
        {
            title: 'Litre',
            values: ['1-10', '10-50'],
        },
    ];

        const fetchData = async () => {
            try {
                const api=await axios.get('http://192.168.100.7:8080/get')
                setData(api.data);
                setFilteredData(api.data);
            } catch (err) {
                setError(err.message);
                console.error("API fetch error: ", err);
            }
        };
        useEffect(() => {
        fetchData();
    }, []);

    const onRefresh=useCallback(async()=>{
        setrefreshing(true)
        try {
            await fetchData()
        } catch (error) {
            console.log('error refreshing',error)
        }
        finally{
            setrefreshing(false)
        }
    },[fetchData])

    useEffect(() => {
        let filtered = data;
        if (selectedFilters.price) {
            const [minPrice, maxPrice] = selectedFilters.price.split('-').map(Number);
            filtered = filtered.filter(item => item.price >= minPrice && item.price <= maxPrice);
        }
    
if (selectedFilters.category) {
    filtered = filtered.filter(item => 
        item.category?.toLowerCase() === selectedFilters.category?.toLowerCase() 
    );
}

if (selectedFilters.litre) {
    filtered = filtered.filter(item => 
        item.litre === selectedFilters.litre
    );
}

        if (searchQuery) {
            const query = searchQuery.toLowerCase();

            filtered = filtered.filter(item => 
                item.name.toLowerCase().includes(query) || 
                item.price.toString().includes(query) 
            );
        }

setFilteredData(filtered);
    }, [searchQuery, data, selectedFilters]);

    const handleFilterSelect = (type, value) => {
        setSelectedFilters(prevFilters => ({
            ...prevFilters,
            [type]: value, 
        }));
        refRBSheet.current.close(); 
    };
        
    const renderItem = ({ item }) => (
        <View key={item._id}>
            <CardUi item={item} />
        </View>
    );

    return (
        <View>
            {error ? (
                <Text>Error: {error}</Text>
            ) : (
                <FlatList 
                refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />}
                keyboardShouldPersistTaps='always'
                    data={filteredData}
                    renderItem={renderItem}
                    ListHeaderComponent={() => (
                        <View className='flex-row gap-4 mt-8 mx-6 mb-5 p-3 rounded-2xl bg-white'>
                            <Ionicons name='search' size={28} />
                            <TextInput 
                                placeholder='Search for products...' 
                                style={{ flex: 1 }}
                                value={searchQuery}
                                onChangeText={text => setSearchQuery(text)}
                                blurOnSubmit={false}
                            />
                            <View>
                            <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                                <Ionicons name='options' size={32} color='blue' />
                            </TouchableOpacity>
                            <View style={{ flex: 1 }}>
                                {/* filter bottom sheet */}
                            <RBSheet
                                ref={refRBSheet}
                                useNativeDriver={false}
                                customStyles={{
                                    wrapper: {
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                    },
                                    draggableIcon: {
                                        backgroundColor: '#000',
                                    },
                                }}
                            >
                                <View style={{ padding: 20 }}>
                                    <Text className='bg-gray-400 h-1 self-center w-32 mb-6 mt-1'></Text>
                                    <View className='flex-row justify-between'>
                                    {filterOptions.map((option, index) => (
    <View key={index}>
        <Text className='font-bold text-xl text-blue-500'>{option.title}</Text>
        {option.values.map((value, idx) => (
            <TouchableOpacity 
                className='my-2' 
                key={idx} 
                onPress={() => handleFilterSelect(option.title.toLowerCase(), value)}  
            >
                <Text>{value}</Text>
            </TouchableOpacity>
        ))}
    </View>
))}
                                    </View>
                                </View>
                            </RBSheet>
                            </View>
                            </View>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                />
            )}
        </View>
    );
};

export default explore;