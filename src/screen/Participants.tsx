import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ImagePath } from '../assets/ImagePath'
import Header from '../components/Header'

const Participants = ({ navigation }: any) => {


    
    return (

        <ImageBackground
            source={ImagePath.backgroundImg}
            style={styles.background}
        >

            <SafeAreaView>

                <Header
                    title="Participants"
                    onBackPress={() => navigation.goBack()}
                />

            </SafeAreaView>


        </ImageBackground>

    )
}

export default Participants

const styles = StyleSheet.create({
    background: { flex: 1, backgroundColor: '#1E2228' },
})