import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    Image,
    TouchableOpacity,
    Platform
} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ImagePath } from '../assets/ImagePath'
import Header from '../components/Header'
import { useCall } from '../context/CallContext';
import { RTCView } from 'react-native-webrtc'
import { hp, wp } from '../components/Responsive'
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BackgroundEffect from '../components/BackgroundEffect'
import BottomControlPanel from '../components/BottomControlPanel'


const AvSetting = ({ navigation }: any) => {


    const {
        localStream,
        isRemoteAccessAllowed,
        isCameraOn,
        cameraPosition,
        isMicOn,
        isSpeakerOn,
        setCameraPosition,
        currentEffect,
        setCurrentEffect,
        toggleMic,
        toggleCamera,
        toggleSpeaker,
    } = useCall();
    console.log("isRemoteAccessAllowed..", isRemoteAccessAllowed)

    const effectMap: Record<string, any> = {
        effect1: ImagePath.BackgroundEffect1,
        effect2: ImagePath.ViliyoLogo,
        effect3: ImagePath.BackgroundEffect,
        effect4: ImagePath.BackgroundEffect,
    };

    const TrainerCard = ({ title }: any) => (

        <View style={{ marginTop: 20 }}>
            <Text style={styles.sectionTitle}>
                <Text style={{ fontWeight: 'bold' }}>
                    {title?.split(' ')[0]}{' '}
                </Text>
                {title?.split(' ').slice(1).join(' ')}
            </Text>
            <View style={styles.card}>


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

                        <View style={{ flexDirection: 'row', }}>

                            <View style={styles.group} >
                                <TouchableOpacity style={styles.icon} >
                                    <MaterialCommunityIcons
                                        name="chevron-up"
                                        size={25}
                                        color="#fff"
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity style={[styles.circleBtn, {
                                    backgroundColor: isCameraOn ? '#3a3a3a' : 'red'
                                }]}
                                    onPress={toggleCamera}
                                >
                                    <MaterialCommunityIcons
                                        name={isCameraOn ? 'video-outline' : 'video-off'}
                                        size={22}
                                        color="#fff"
                                    />
                                </TouchableOpacity>

                            </View>

                            <View>
                                <TouchableOpacity style={[styles.circleBtn, { borderColor: '#2D3037', marginLeft: 10 }]} >
                                    <BackgroundEffect
                                        currentEffect={currentEffect}
                                        onApply={setCurrentEffect}
                                    />
                                </TouchableOpacity>
                            </View>

                        </View>



                        <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'space-between' }}>
                            <View>
                                <TouchableOpacity style={styles.circleBtn} >
                                    <MaterialCommunityIcons
                                        name={isSpeakerOn ? 'volume-high' : 'volume-off'}
                                        size={22}
                                        color="#fff"
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.group}>

                                <TouchableOpacity style={styles.icon} >
                                    <MaterialCommunityIcons
                                        name="chevron-up"
                                        size={25}
                                        color="#fff"
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.circleBtn} >
                                    <MaterialCommunityIcons
                                        name={isMicOn ? 'microphone-outline' : 'microphone-off'}
                                        size={22}
                                        color="#fff"
                                    />

                                </TouchableOpacity>

                            </View>
                        </View>




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

                <View style={{ flex: 1 }}>

                    <TrainerCard title="Trainer’s Console" />

                    {isRemoteAccessAllowed && (
                        <TrainerCard title="Trainer’s Remote" />
                    )}

                </View>


           

            </SafeAreaView>
     <BottomControlPanel
                    onForceMute={() => console.log('Force Mute')}
                    onSystemMute={() => console.log('System Mute')}
                    onAnnouncement={() => console.log('Announcement')}
                    onConfirm={() => console.log('Confirm')}
                />
        </ImageBackground>
    )
}

export default AvSetting
const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#1E2228'
    },

    sectionTitle: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center'
    },

    card: {
        backgroundColor: '#35363C',
        margin: 10,
        borderRadius: 20,
        padding: 15,
    },

    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'


    },

    controls: {

    },

    circleBtn: {
        width: 45,
        height: 45,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#FFC107',
        // margin: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2D3037',

    },




    trainerImageMock: {
        width: wp(40),
        height: hp(12),
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


  
  
    group: {
        width: wp(23),
        height: hp(5.5),
        flexDirection: 'row',
        backgroundColor: '#2D3037',
        borderRadius: 25,
        justifyContent: 'flex-end',
        alignItems: 'center',


    },

    icon: {
        width: wp(8),
        height: hp(4),
        borderRadius: 25,
        backgroundColor: '#2D3037',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },


})