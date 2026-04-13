import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ParamListBase } from '@react-navigation/native'
import { ImagePath } from '../assets/ImagePath'
import { wp, hp } from '../components/Responsive'



type SplashScreenNavigationProp = NativeStackNavigationProp<ParamListBase, 'Splash'>

interface Props {
  navigation: SplashScreenNavigationProp
}

const Splash: React.FC<Props> = ({ navigation }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login')
    }, 2000)

    return () => clearTimeout(timer) 
  }, [])

  return (
     <ImageBackground source={ImagePath.backgroundImg} style={styles.background}>
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        {/* <Text style={styles.logoText}>Viliyo</Text> */}

        <Image 
        source={ImagePath.ViliyoLogo}
        style={styles.logoImg}
        />
       
      </View>
    </SafeAreaView>
    </ImageBackground>
 
)
}

export default Splash

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },

    background: { 
    flex: 1,
     resizeMode: 'cover',
    backgroundColor:'#2D3037' 
     },

  logoContainer: {
    alignItems: 'center',
  },

  logoText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },


  logoImg:{
    width:wp(50),
    height:hp(10),
    resizeMode:'contain'
  }
})