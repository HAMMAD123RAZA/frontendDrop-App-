import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../../rtk/CartSlice';  
import axios from 'axios'

const MyCart = () => {
    const [showAllItems, setShowAllItems] = useState(false);  
    const [totalBill, setTotalBill] = useState(0); 
    const cartItems = useSelector(state => state.cart.items);  
    const totalQuantity = useSelector(state => state.cart.totalQuantity);
    const dispatch = useDispatch();
    const handleSendEmail=async()=>{
        try {
            const orderDetails = cartItems.map(item => ({
                name: item.name,
                category: item.category,
                price: item.price,
                quantity: item.quantity
              }));
          
            const api=await axios.post('http://192.168.100.2:8080/sendOrder',{
                orderDetails
            })
            console.log(api.data)
        } catch (error) {
            console.log(error)
        }
    }
    const itemsToShow = showAllItems ? cartItems : cartItems.slice(0, 2);

    const sumUp = () => {
        let total = 0;
        cartItems.forEach(item => {
            total += item.price * item.quantity;
        });
        setTotalBill(total);
    };
    
    useEffect(() => {
        sumUp();
    }, [cartItems]);

    const renderCartItem = ({ item }) => (
        <View className='py2'>
            <View className='flex-row gap-x-5 m-4'>
                <Image style={{borderRadius: 8}} source={{uri: item.image}} width={140} height={120} />
                <View className='px-4'>
                    <Text className='font-bold text-xl pt-1 text-gray-400'>{item.name}</Text>
                    <Text className='pt-1 text-gray-500 font-bold'>Quantity: {item.quantity}</Text>
                    <Text className='font-bold pt-1'>{item.price} PKR</Text>
                    <TouchableOpacity className='my-2 py-1 pl-1 bg-blue-500 rounded-lg' onPress={() => dispatch(removeFromCart(item.id))}>
                        <Text className='text-white text-center'>Remove</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
<View >
{cartItems.length > 0 ? ( 
                <FlatList
                    data={itemsToShow}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderCartItem}
                    horizontal={false}
                    showsVerticalScrollIndicator={true} 
                    ListFooterComponent={()=>{
                        return (
                            <View>

            <View className='p-4 mt-6 rounded-lg '>
            {cartItems.length > 2 && !showAllItems && (
                <TouchableOpacity onPress={() => setShowAllItems(true)}>
                    <Text className='text-blue-700 text-lg text-center'>Show more</Text>
                </TouchableOpacity>
            )}

            {showAllItems && (
                <TouchableOpacity onPress={() => setShowAllItems(false)}>
                    <Text className='text-blue-700 text-lg text-center font-bold  '>Show less</Text>
                </TouchableOpacity>
            )}

            {showAllItems && (
                <TouchableOpacity className='m-6 my-2 py-2 bg-blue-500 rounded-lg' onPress={() => dispatch(clearCart())}>
                    <Text className='text-center text-lg font-bold text-white'>Clear Cart</Text>
                </TouchableOpacity>
            )}


            <Text className='text-2xl font-bold text-gray-700 mb-4 text-center'>Billing Info</Text>
            
            <View className='flex-row justify-between mb-2'>
                <Text className='font-bold pt-4 text-gray-600'>Total Items:</Text>
                <Text className='font-bold pt-4 text-gray-800'>{totalQuantity}</Text>
            </View>
            
            <View className='flex-row justify-between mb-2'>
                <Text className='font-bold pt-4 text-gray-600'>Subtotal:</Text>
                <Text className='font-bold pt-4 text-gray-800'>{totalBill} PKR</Text>
            </View>

            <View className='border-t border-gray-300 mt-4 mb-4'></View>

            <View className='flex-row justify-between'>
                <Text className='font-bold pt-4 text-lg  text-gray-800'>Total:</Text>
                <Text className='font-bold pt-4 text-lg text-blue-500'>{totalBill} PKR</Text>
            </View>
        </View>
        <TouchableOpacity onPress={handleSendEmail} >
            <Text  className='px-3 p-3 text-lg my-2 mx-9 bg-blue-500 rounded-3xl font-bold text-white text-center ' >Request</Text>
            </TouchableOpacity>

</View>
                        ) 
                    }}

                />
            ) : (
                <Text>No items in the cart.</Text>
            )}

        </View>
    );
};

export default MyCart;