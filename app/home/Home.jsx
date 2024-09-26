import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Headers from '../components/Headers'
import Category from '../components/Category'
import Cards from '../components/Cards'
import SpecialCards from '../components/SpecialCards'

const Home = () => {
  return (
    <ScrollView>
      <Headers/>
      <Category/>
      <Cards/>
      <SpecialCards/>
    </ScrollView>
  )
}

export default Home