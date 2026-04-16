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
      <Image source={ImagePath.user1} style={styles.avatar} />
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
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
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

  bottomPanel: {
    width: '100%',
    height: hp(20),
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