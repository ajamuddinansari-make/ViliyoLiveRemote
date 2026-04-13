import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ImagePath } from '../assets/ImagePath'
import Header from '../components/Header'
import { useCall } from '../context/CallContext';
import { RTCView } from 'react-native-webrtc'
import { hp } from '../components/Responsive'
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BackgroundEffect from '../components/BackgroundEffect'


const AvSetting = ({ navigation }: any) => {


    const {
        localStream,
        isRemoteAccessAllowed,
        isCameraOn,
        setIsCameraOn,
        cameraPosition,
        setCameraPosition,
        currentEffect,
        setCurrentEffect,
    } = useCall();
    console.log("isRemoteAccessAllowed..", isRemoteAccessAllowed)

    const effectMap: Record<string, any> = {
        effect1: ImagePath.BackgroundEffect1,
        effect2: ImagePath.ViliyoLogo,
        effect3: ImagePath.BackgroundEffect,
        effect4: ImagePath.BackgroundEffect,
    };

    const TrainerCard = ({ title }: any) => (
        <View style={styles.card}>
            <Text style={styles.sectionTitle}>{title}</Text>

            <View style={styles.cardContent}>





                <View style={styles.trainerImageMock}>
                    {isRemoteAccessAllowed && localStream && isCameraOn ? (
                        <View style={StyleSheet.absoluteFill}>
                            <RTCView
                                streamURL={localStream.toURL()}
                                style={StyleSheet.absoluteFill}
                                objectFit="cover"
                                mirror={cameraPosition === 'front'}
                            />

                       
                            {currentEffect !== '' && effectMap[currentEffect] && (
                                <ImageBackground
                                    source={effectMap[currentEffect]}
                                    style={StyleSheet.absoluteFill}
                                    resizeMode="cover"
                                    imageStyle={{ opacity: 0.35 }}
                                />
                            )}

                            <Text style={styles.trainerName}>Trainer Name</Text>
                        </View>
                    ) : null}
                </View>

                <View style={styles.controls}>

                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style={styles.circleBtn} >
                            <MaterialCommunityIcons
                                name={isCameraOn ? 'video-outline' : 'video-off'}
                                size={22}
                                color="#fff"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.circleBtn} >
                            <BackgroundEffect
                                currentEffect={currentEffect}
                                onApply={setCurrentEffect}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'row'}}>

                        <TouchableOpacity style={styles.circleBtn} >
                               {/* <MaterialCommunityIcons
                                                name={isSpeakerOn ? 'volume-high' : 'volume-off'}
                                                size={22}
                                                color="#fff"
                                              /> */}
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.circleBtn} />
                    </View>
                </View>
            </View>
        </View>
    )

    return (
        <ImageBackground
            source={ImagePath.backgroundImg}
            style={styles.background}
        >
            <SafeAreaView style={{ flex: 1 }}>

                <Header
                    title="AV SETTINGS"
                    onBackPress={() => navigation.goBack()}
                />

                <TrainerCard title="Trainer’s Console" />

                {isRemoteAccessAllowed && (
                    <TrainerCard title="Trainer’s Remote" />
                )}



                <LinearGradient
                    colors={['#373737', '#1B1F24', '#111']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.bottomPanel}
                >
                </LinearGradient>

            </SafeAreaView>
        </ImageBackground>
    )
}

export default AvSetting
const styles = StyleSheet.create({
    background: {
        flex: 1,
    },

    sectionTitle: {
        color: '#fff',
        fontSize: 18,
        marginBottom: 10,
        fontWeight: '600',
    },

    card: {
        backgroundColor: '#2A2F36',
        margin: 15,
        borderRadius: 20,
        padding: 15,
    },

    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    profileBox: {
        width: 140,
        height: 100,
        borderRadius: 12,
        overflow: 'hidden',
        justifyContent: 'flex-end',
    },

    profileImg: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },

    name: {
        color: '#fff',
        padding: 8,
        fontSize: 12,
    },

    controls: {
        flex: 1,
        // flexDirection: 'row',
        // justifyContent: 'space-evenly',
    },

    circleBtn: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#FFC107',
        margin: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },

    bottomPanel: {
        width: '100%',
        height: hp(20),
        marginTop: 'auto',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },

    bottomBtn: {
        alignItems: 'center',
        margin: 10,
    },

    iconBox: {
        width: 50,
        height: 50,
        backgroundColor: '#3A3F45',
        borderRadius: 10,
    },

    bottomText: {
        color: '#fff',
        marginTop: 5,
        fontSize: 12,
    },

    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 15,
    },

    roundBtn: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#3A3F45',
        justifyContent: 'center',
        alignItems: 'center',
    },

    roundText: {
        color: '#fff',
        fontSize: 10,
        textAlign: 'center',
    },
    trainerImageMock: {
        width: 140,
        height: 100,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#1E1E1E',
        justifyContent: 'center',
    },
    trainerName: {
        position: 'absolute',
        bottom: 8,
        left: 8,
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
        backgroundColor: 'rgba(0,0,0,0.4)',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
    },
})