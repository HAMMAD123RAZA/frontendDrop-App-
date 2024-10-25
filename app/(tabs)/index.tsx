import React, { useState, useCallback } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import Headers from '../components/Headers';
import Category from '../components/Category';
import Cards from '../components/Cards';
import SpecialCards from '../components/SpecialCards';

const index = () => {
  const [refreshing, setRefreshing] = useState(false);

  // Function to handle the refresh event
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    
    // Simulate fetching new data (or real logic for data fetching)
    setTimeout(() => {
      // You can fetch new data here and update your state
      setRefreshing(false);
    }, 2000); // Simulating a delay of 2 seconds
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Headers />
      <Category />
      <Cards />
      <SpecialCards />
    </ScrollView>
  );
};

export default index;
