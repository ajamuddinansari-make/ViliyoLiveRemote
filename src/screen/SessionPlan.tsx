import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native'
import React from 'react'
import { ImagePath } from '../assets/ImagePath'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Header'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Image } from 'react-native'
import { hp, wp } from '../components/Responsive'
import LinearGradient from 'react-native-linear-gradient';
import { useCall } from '../context/CallContext'
import BottomControlPanel from '../components/BottomControlPanel'


const SessionPlan = ({ navigation }: any) => {

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

  const Card = ({ active = false, title, subtitle, icon, image }: any) => (
    <View style={{ flexDirection: 'row', width: wp(80), }}>

      <View style={[styles.card, active && styles.activeCard]}>
        <View style={styles.left}>

          <Image source={image} style={styles.editBtn} />
          <Text style={styles.time}>120 mins</Text>
        </View>


        <View style={styles.center}>
          <Text style={styles.cardTitle}>
            <Text style={{ fontWeight: 'bold' }}>{title} </Text>
          </Text>
          <Text style={styles.subTitle}>{subtitle}</Text>
        </View>


        <View style={styles.right}>
          <TouchableOpacity style={styles.iconBtn}>

            <Image
              source={ImagePath.Edit}
              style={styles.editBtn}
            />
          </TouchableOpacity>

        </View>

      </View>
      <View style={{ marginLeft: -10 }} >
        <TouchableOpacity style={[styles.playBtn, active && styles.pauseBtn]}>

          <Image
            source={active ? ImagePath.Play : ImagePath.Play}
            style={styles.playImg}
          />

        </TouchableOpacity>
      </View>
    </View>
  )

  const Section = ({ title, children }: any) => (
    <View style={{ marginTop: 25 }}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  )

  return (
    <ImageBackground
      source={ImagePath.backgroundImg}
      style={styles.background}
    >
      <SafeAreaView style={{ flex: 1,  }}
         edges={['top']}
      >

        <Header
          title="SESSION PLAN"
          onBackPress={() => navigation.goBack()}
        />

        <ScrollView contentContainerStyle={{ paddingBottom: hp(18), margin:10 }}>





          <Section title="SEGMENT 1">
            <Card
              active
              title="ROLE PLAY"
              subtitle="<Role Play Title>"
              image={ImagePath.Drama}
            />

            <Card
              title="ROLE PLAY"
              subtitle="<Role Play Title>"
              image={ImagePath.Drama}
            />
          </Section>


          <Section title="SEGMENT 2">
            <Card
              title="CASE STUDY"
              subtitle="<Case Study Title>"
              image={ImagePath.Search}
            />

            <Card
              title="GROUP DISCUSSION"
              subtitle="<GD Title>"
              image={ImagePath.Vector}
            />

            <Card
              title="POLL"
              subtitle="<Poll Title>"
              image={ImagePath.Poll}
            />
          </Section>

        </ScrollView>


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

export default SessionPlan

const styles = StyleSheet.create({
  background: { flex: 1, backgroundColor: '#1E2228', tintColor: '#373737' },

  mainTitle: {
    textAlign: 'center',
    fontSize: 26,
    color: '#fff',
    marginTop: 10,
  },

  sectionTitle: {
    color: '#ccc',
    marginLeft: 20,
    marginBottom: 10,
  },

  card: {
    width: wp(75),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#35363C',
    marginHorizontal: 15,
    marginBottom: 12,
    borderRadius: 12,
    padding: 10,
  },

  activeCard: {
    backgroundColor: '#6b5b2c',
    width: wp(75),

  },

  left: {
    alignItems: 'center',
  },

  time: {
    color: '#ccc',
    fontSize: 12,
    marginTop: 5,
  },

  center: {
    flex: 1,
    paddingHorizontal: 10,
  },

  cardTitle: {
    color: '#fff',
    fontSize: 14,
  },

  subTitle: {
    color: '#ccc',
    fontSize: 13,
    marginTop: 3,
  },

  right: {
    width: wp(20),
    alignItems: 'center',
  // backgroundColor:'red'
  
  },

  iconBtn: {
    backgroundColor: '#333',
    padding: 8,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 50
  },

  editBtn: {
    width: wp(6),
    height: hp(2.5),
    resizeMode: 'contain'
  },

  playBtn: {
    width: 55,
    height: 55,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#888',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 3
  },

  pauseBtn: {
    borderColor: '#f0c040',
  },
  playImg: {
    width: wp(8),
    height: hp(5),
    resizeMode: 'contain'
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

})