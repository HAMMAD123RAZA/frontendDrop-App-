import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const CustomHeader = ({ title }) => {
  const router = useRouter();

  return (
    <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back('/')}>
        <Ionicons name="chevron-back-outline" size={28} color='black' />
                </TouchableOpacity>
      <Text style={styles.title} className='text-black' >{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:23,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    flex: 1,
  },
});

export default CustomHeader;