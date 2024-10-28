import React, { useState, useCallback } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import Headers from '../components/Headers';
import Category from '../components/Category';
import Cards from '../components/Cards';
import SpecialCards from '../components/SpecialCards';
import Slider from '../components/Slider'

const index = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    
    setTimeout(() => {
      setRefreshing(false);
    }, 1000); 
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Headers />
      <Category />
      <Slider/>
      <Cards />
      <SpecialCards />
    </ScrollView>
  );
};

export default index;
