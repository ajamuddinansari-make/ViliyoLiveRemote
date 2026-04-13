import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import React from 'react'
import { ImagePath } from '../assets/ImagePath'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Header'

const SessionPlan = ({ navigation }: any) => {
    return (
        <ImageBackground
            source={ImagePath.backgroundImg}
            style={styles.background}
        >
            <SafeAreaView>

                <Header
                    title="Session Plan"
                    onBackPress={() => navigation.goBack()}
                />

            </SafeAreaView>


        </ImageBackground>
    )
}

export default SessionPlan

const styles = StyleSheet.create({
    background: { flex: 1, backgroundColor: '#1E2228' },

})