import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ImagePath } from '../assets/ImagePath'
import { StyleSheet } from 'react-native'
import Header from '../components/Header'

const Grouping = ({navigation}: any) => {
  return (
    <ImageBackground 
    source={ImagePath.backgroundImg}
    style={styles.background}
    >
    
    <SafeAreaView>
    

   <Header
  title="Grouping"
  onBackPress={() => navigation.goBack()}
/>
     </SafeAreaView>
    </ImageBackground>
  )
}

export default Grouping

const styles = StyleSheet.create({
    
 background: { flex: 1, backgroundColor: '#1E2228' },
    
})