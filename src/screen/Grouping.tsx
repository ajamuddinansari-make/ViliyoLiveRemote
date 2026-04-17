import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  Platform,
} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ImagePath } from '../assets/ImagePath'
import Header from '../components/Header'
import LinearGradient from 'react-native-linear-gradient';
import { hp, wp } from '../components/Responsive'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useCall } from '../context/CallContext';
import BottomControlPanel from '../components/BottomControlPanel'



const groupData = [
  {
    id: '1',
    name: 'Group Name',
    learners: new Array(8).fill(null),
  },
  {
    id: '2',
    name: 'Group Name',
    learners: new Array(8).fill(null),
  },
]

const Grouping = ({ navigation }: any) => {


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

  const renderLearner = (_: any, index: number) => (
    <View style={styles.learnerItem} key={index}>
      <Image source={ImagePath.Participant} style={styles.avatar} />
      <Text style={styles.learnerText}>{'<Learner Name>'}</Text>
    </View>
  )

  const renderGroup = (group: any) => (
    <View style={styles.groupCard} key={group.id}>
      <Text style={styles.groupTitle}>{group.name}</Text>

      <View style={styles.divider} />

      <View style={styles.grid}>
        {group.learners.map(renderLearner)}
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
          title="GROUP  CONFIG"
          onBackPress={() => navigation.goBack()}
        />

        <ScrollView contentContainerStyle={{ paddingBottom: hp(50) }}>




          <Text style={styles.label}>Current Grouping:</Text>
          <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownText}>In existing groups</Text>
          </TouchableOpacity>


          {groupData.map(renderGroup)}

        </ScrollView>


        <View style={styles.applyContainer}>
          <TouchableOpacity style={styles.applyBtn}>
            <Text style={styles.applyText}>APPLY</Text>
          </TouchableOpacity>


         
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

export default Grouping

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#1E2228'
  },

  mainTitle: {
    textAlign: 'center',
    fontSize: 26,
    color: '#fff',

  },

  label: {
    color: '#ccc',
    textAlign: 'center',
    marginTop: 10,
  },

  dropdown: {
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: '#2D3037',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },

  dropdownText: {
    color: '#fff',
  },

  groupCard: {
    marginHorizontal: 15,
    marginTop: 10,
    backgroundColor: '#2a2e35',
    borderRadius: 15,
    padding: 10,
  },

  groupTitle: {
    color: '#fff',
    fontSize: 16,
  },

  divider: {
    height: 2,
    backgroundColor: '#aaa',
    marginVertical: 10,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  learnerItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5a5d66',
    padding: 3,
    borderRadius: 8,
    marginBottom: 5,
  },

  avatar: {
    width: 25,
    height: 25,
    borderRadius: 14,
    marginRight: 8,
    resizeMode:'center'
  },

  learnerText: {
    color: '#fff',
    fontSize: 12,
  },

  applyContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios'? -32: -12,
    width: '100%',
    height: hp(8), 
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent:'center'
  },

  applyBtn: {
    // height:hp(5),
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: 60,
    
  },

  applyText: {
    color: '#fff',
    fontSize: 16,
  },


})