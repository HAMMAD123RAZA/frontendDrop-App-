import { View, Text, FlatList, Dimensions, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Image } from 'react-native'

const data=[
    {
        id:1,
        img:"https://www.chargerwater.com/wp-content/uploads/2018/05/clean-water.jpg"

    },
    {
        id:2,
        img:"https://siwi.org/wp-content/uploads/2021/09/colorful-water-drop-splash-e1635164525186.jpg"
    },
    {
        id:3,
        img:"https://api.hub.jhu.edu/factory/sites/default/files/styles/landscape/public/ww-hydration-hub.jpg"
    },
    {
        id:4,
        img:"https://h2oglobalnews.com/wp-content/uploads/2023/08/water-types-scaled.webp"    
    },
]

const Slider = () => {
    
          const renderItem=({item})=>{
        
        return (
            <View key={item.id} className='p-5' >
                <Image source={{uri:item.img}} style={{borderRadius:13}}  height={120} width={320} />
            </View>
        )
    }
    
    const { width } = Dimensions.get('screen');
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentIndex((prevIndex) =>
            prevIndex === data.length - 1 ? 0 : prevIndex + 1
          );
          flatListRef.current.scrollToIndex({
            index: currentIndex === data.length - 1 ? 0 : currentIndex + 1,
            animated: true,
          });
        }, 1000);
      
        return () => clearInterval(interval);
      }, [currentIndex]);
      
  return (
    <View>
<FlatList ref={flatListRef} data={data} 
renderItem={renderItem}
keyExtractor={(item)=>item.id.toString()}
 horizontal
 pagingEnabled
  showsHorizontalScrollIndicator={false} />
    </View>
  )
}

export default Slider






