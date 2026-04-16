import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    ScrollView,
    Platform
} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ImagePath } from '../assets/ImagePath'
import Header from '../components/Header'
import LinearGradient from 'react-native-linear-gradient';
import { hp, wp } from '../components/Responsive';
import { useCall } from '../context/CallContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomControlPanel from '../components/BottomControlPanel'



const participantsData = [
    {
        id: '1',
        groupName: 'Group Name',
        members: [
            { id: '1', name: 'Trainee Name', image: ImagePath.user1 },
            { id: '2', name: 'Trainee Name', image: ImagePath.user2 },
            { id: '3', name: 'Trainee Name', image: ImagePath.user3 },
        ],
    },
    {
        id: '2',
        groupName: 'Group Name',
        members: [
            { id: '4', name: 'Trainee Name', image: ImagePath.user1 },
            { id: '5', name: 'Trainee Name', image: ImagePath.user2 },
            { id: '6', name: 'Trainee Name', image: ImagePath.user3 },
        ],
    },
]

const Participants = ({ navigation }: any) => {

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



    const renderMember = ({ item }: any) => (
        <View style={styles.card}>
            <Image source={item.image} style={styles.avatar} />


            <View style={styles.menuIcon}>
                <Text style={{ color: '#fff' }}>≡</Text>
            </View>


            <View style={styles.nameBar}>
                <Text style={styles.nameText}>{item.name}</Text>
            </View>
        </View>
    )

    const renderGroup = ({ item }: any) => (
        <View style={styles.groupContainer}>
            <Text style={styles.groupTitle}>{item.groupName}</Text>

            <FlatList
                data={item.members}
                renderItem={renderMember}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )

    return (
        <ImageBackground
            source={ImagePath.backgroundImg}
            style={styles.background}
        >
            <SafeAreaView style={{ flex:1}}>
                <Header
                    title="Participants (20/25)"
                    onBackPress={() => navigation.goBack()}
                />

                <FlatList
                    data={participantsData}
                    renderItem={renderGroup}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                />




                {/* <LinearGradient
                    colors={['#373737', '#1B1F24', '#111']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.bottomPanel}
                >
                    <View style={styles.cameraOffContainer}>

                        <TouchableOpacity
                            style={[styles.circleIcon, {

                            }]}
                        >
                            <MaterialCommunityIcons
                                name={isCameraOn ? 'video-outline' : 'video-off'}
                                size={25}
                                color="#fff"
                            />
                            <Text style={styles.actionText}>Camera </Text>

                        </TouchableOpacity>


                        <TouchableOpacity style={styles.circleIcon}

                        >
                            <MaterialCommunityIcons
                                name="camera-flip-outline"
                                size={22}
                                color="#fff"
                            />
                            <Text style={styles.actionText}>Flip</Text>
                        </TouchableOpacity>


                        <TouchableOpacity style={styles.circleIcon}

                        >
                            <MaterialCommunityIcons
                                name={isMicOn ? 'microphone-outline' : 'microphone-off'}
                                size={22}
                                color="#fff"
                            />
                            <Text style={styles.actionText}>Mic</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.circleIcon}

                        >
                            <MaterialCommunityIcons
                                name={isSpeakerOn ? 'volume-high' : 'volume-off'}
                                size={22}
                                color="#fff"
                            />
                            <Text style={styles.actionText}>Speaker</Text>
                        </TouchableOpacity>

                    </View>


                    <View style={styles.cameraOffContainer}>
                        <View>
                            <TouchableOpacity
                                style={styles.circleBtnBottom}
                            >
                                <MaterialCommunityIcons
                                    name="account-multiple-remove"
                                    size={35}
                                    color="#fff"
                                />

                            </TouchableOpacity>

                            <Text style={styles.roundText}>Force Mute </Text>
                        </View>

                        <View>
                            <TouchableOpacity
                                style={styles.circleBtnBottom}
                            >
                                <MaterialCommunityIcons
                                    name="microphone-outline"
                                    size={22}
                                    color="#fff"
                                />
                            </TouchableOpacity>
                            <Text style={styles.roundText}>System Mute </Text>
                        </View>

                        <View>
                            <TouchableOpacity
                                style={styles.circleBtnBottom}
                            >
                                <MaterialCommunityIcons
                                    name="bullhorn-outline"
                                    size={22}
                                    color="#fff"
                                />

                            </TouchableOpacity>
                            <Text style={styles.roundText}>Announcement</Text>
                        </View>

                        <View>
                            <TouchableOpacity
                                style={styles.circleBtnBottom}
                            >
                                <MaterialCommunityIcons
                                    name="check-circle-outline"
                                    size={25}
                                    color="#fff"
                                />

                            </TouchableOpacity>
                            <Text style={styles.roundText}>Ok / confirm</Text>

                        </View>




                    </View>




                </LinearGradient> */}



         {/* <BottomControlPanel /> */}
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

export default Participants

const styles = StyleSheet.create({
    background: { flex: 1, backgroundColor: '#1E2228' },

    groupContainer: {
        marginVertical: 10,
        paddingHorizontal: 15,
    },

    groupTitle: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#aaa',
        paddingBottom: 5,
    },

    card: {
        width: 140,
        height: 160,
        borderRadius: 10,
        marginRight: 10,
        overflow: 'hidden',
        backgroundColor: '#333',
    },

    avatar: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },

    menuIcon: {
        position: 'absolute',
        top: 10,
        left: 10,
    },

    nameBar: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 5,
    },

    nameText: {
        color: '#fff',
        fontSize: 12,
    },


    controlBtn: {
        alignItems: 'center',
    },

    controlText: {
        color: '#fff',
        fontSize: 12,
    },

    bottomPanel: {
        width: '100%',
        height: hp(20),
        marginTop: 'auto',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        bottom: Platform.OS === 'ios' ? -hp(3.5) : 0,

    },

    cameraOffContainer: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row'
    },
    circleIcon: {
        width: wp(15),
        height: hp(6),
        backgroundColor: '#2A2A2A',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(2),
        borderRadius: 10
    },
    actionText: { color: '#fff', fontSize: 9 },

    circleBtnBottom: {
        width: wp(15),
        height: hp(7),
        borderRadius: 35,
        backgroundColor: '#2A2A2A',
        margin: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    roundText: {
        color: '#fff',
        fontSize: 10,
        textAlign: 'center',
    },
})