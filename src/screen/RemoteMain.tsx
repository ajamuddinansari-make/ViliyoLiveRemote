import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { ImagePath } from '../assets/ImagePath';
import { hp, wp } from '../components/Responsive';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RTCView, mediaDevices } from 'react-native-webrtc';
import InCallManager from 'react-native-incall-manager';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCall } from '../context/CallContext';

const RemoteMain = ({ navigation }: any) => {


const {
  localStream,
  isRemoteAccessAllowed,
  currentEffect,
  isCameraOn,
  isMicOn,
  cameraPosition,
  isSpeakerOn,
  toggleMic,
  toggleCamera,
  toggleSpeaker,
} = useCall();
  console.log("isRemoteAccessAllowed..", isRemoteAccessAllowed)



  const [isPauseOn, setIsPauseOn] = useState(true);

  const effectMap: Record<string, any> = {
    effect1: ImagePath.BackgroundEffect1,
    effect2: ImagePath.ViliyoLogo,
    effect3: ImagePath.BackgroundEffect,
    effect4: ImagePath.BackgroundEffect,
  };

 

  

  const flipCamera = () => {
    if (!localStream) return;
    localStream.getVideoTracks().forEach(track => {
      if (track._switchCamera) {
        track._switchCamera();
      }
    });

   
  };

  return (
    <ImageBackground
      source={ImagePath.backgroundImg}
      style={styles.background}
      blurRadius={18}
    >
      <SafeAreaView style={styles.safe} 
       edges={['top']}
      >
        <ScrollView contentContainerStyle={styles.container}>

          <View style={styles.topRow}>
            <TouchableOpacity style={[styles.topButton, { borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }]}>
              <Image source={ImagePath.EndSession} style={styles.EndImg} />
              <Text style={styles.topButtonText}>End Session</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.topButton, { borderTopRightRadius: 20, borderBottomRightRadius: 20 }]}
              onPress={() => navigation.goBack()}
            >
              <Image source={ImagePath.ExitRemote} style={styles.EndImg} />
              <Text style={styles.topButtonText}>Exit Remote</Text>
            </TouchableOpacity>
          </View>


          <View style={[styles.panel, !isRemoteAccessAllowed && {  marginTop: hp(2)}]}>

            <View style={[styles.trainerImageMock, isRemoteAccessAllowed && {  backgroundColor: '#2D3440'} ]}>
              {isRemoteAccessAllowed && localStream ? (
                isCameraOn ? (
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
                ) : (
                  <View style={styles.cameraOffContainer}>
                    <MaterialCommunityIcons
                      name="video-off"
                      size={35}
                      color="#fff"
                    />
                    <Text style={styles.cameraOffText}>Camera Off</Text>
                  </View>
                )
              ) : null}
            </View>

            {isRemoteAccessAllowed && (
              <View style={styles.quickActions}>
                <TouchableOpacity style={[styles.circleIcon, {
                  backgroundColor: isCameraOn ? '#3a3a3a' : 'red'
                }]}
                  onPress={toggleCamera}>
                  <MaterialCommunityIcons
                    name={isCameraOn ? 'video-outline' : 'video-off'}
                    size={22}
                    color="#fff"
                  />
                  <Text style={styles.actionText}>Camera</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.circleIcon} onPress={flipCamera}>
                  <MaterialCommunityIcons
                    name="camera-flip-outline"
                    size={22}
                    color="#fff"
                  />
                  <Text style={styles.actionText}>Flip</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.circleIcon, {
                  backgroundColor: isMicOn ? '#3a3a3a' : 'red'
                }]}
                  onPress={toggleMic}
                >
                  <MaterialCommunityIcons
                    name={isMicOn ? 'microphone-outline' : 'microphone-off'}
                    size={22}
                    color="#fff"
                  />
                  <Text style={styles.actionText}>Mic</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.circleIcon,
                  { backgroundColor: isSpeakerOn ? '#3a3a3a' : 'red' }
                  ]}
                  onPress={toggleSpeaker}
                >
                  <MaterialCommunityIcons
                    name={isSpeakerOn ? 'volume-high' : 'volume-off'}
                    size={22}
                    color="#fff"
                  />
                  <Text style={styles.actionText}>Speaker</Text>
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.line} />

            <View style={styles.playView}>

              <Text style={[styles.playTxt, { fontWeight: '800' }]}>ROLE PLAYING </Text>
              <Text style={styles.playTxt}>IN PROGRESS</Text>
            </View>


            <View style={styles.circleWrapper}>
              <Text style={styles.topCircleLabel}>Trainer's{'\n'}Talk</Text>
              <Text style={styles.leftCircleLabel}>Role-player{'\n'}Briefing</Text>
              <Text style={styles.rightCircleLabel}>Role Play{'\n'}De-briefing</Text>
              <Text style={styles.bottomCircleLabel}>Group{'\n'}Discussion</Text>


              <View style={styles.remoteOuterView}>

                <TouchableOpacity style={styles.topArrow}>
                  <MaterialCommunityIcons
                    name="triangle-outline"
                    size={22}
                    color="#fff"
                  />
                </TouchableOpacity>


                <TouchableOpacity style={styles.leftArrow}>
                  <MaterialCommunityIcons
                    name="triangle-outline"
                    size={22}
                    color="#fff"
                    style={{ transform: [{ rotate: '-90deg' }] }}
                  />
                </TouchableOpacity>


                <TouchableOpacity style={styles.rightArrow}>
                  <MaterialCommunityIcons
                    name="triangle-outline"
                    size={22}
                    color="#fff"
                    style={{ transform: [{ rotate: '90deg' }] }}
                  />
                </TouchableOpacity>


                <TouchableOpacity style={styles.bottomArrow}>
                  <MaterialCommunityIcons
                    name="triangle-outline"
                    size={22}
                    color="#fff"
                    style={{ transform: [{ rotate: '180deg' }] }}
                  />
                </TouchableOpacity>


                <View style={styles.remoteInnerView}>
                  <TouchableOpacity
                    onPress={() => setIsPauseOn(!isPauseOn)}
                  >
                    <MaterialCommunityIcons
                      name={isPauseOn ? 'pause-circle' : 'play-circle'}
                      size={60}
                      color="#f5c542"
                    />
                  </TouchableOpacity>
                </View>


              </View>
            </View>

            <View style={{ flexDirection: 'row', marginBottom: 60 }}>
              <View style={styles.forcTouchView}>
                <TouchableOpacity style={styles.forcTouch}>
                  <MaterialCommunityIcons
                    name="account-multiple-remove"
                    size={22}
                    color="#fff"
                  />
                </TouchableOpacity>
                <Text style={styles.actionText}>Force Mute</Text>
              </View>

              <View style={styles.forcTouchView}>
                <TouchableOpacity style={styles.forcTouch}>
                  <MaterialCommunityIcons
                    name="microphone-outline"
                    size={22}
                    color="#fff"
                  />
                </TouchableOpacity>
                <Text style={styles.actionText}>System Mute</Text>
              </View>


              <View style={styles.forcTouchView}>
                <TouchableOpacity style={styles.forcTouch}>
                  <MaterialCommunityIcons
                    name="bullhorn-outline"
                    size={22}
                    color="#fff"
                  />
                </TouchableOpacity>
                <Text style={styles.actionText}>Announcement</Text>
              </View>

              <View style={styles.forcTouchView}>
                <TouchableOpacity style={styles.forcTouch}>
                  <MaterialCommunityIcons
                    name="check-circle-outline"
                    size={25}
                    color="#fff"
                  />
                </TouchableOpacity>
                <Text style={styles.actionText}>Ok / Confirm</Text>
              </View>

            </View>

          </View>

          <View style={styles.bottomView}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity style={styles.AVSettingTouch}
                onPress={() => {
                  navigation.navigate('AvSetting')
                }}
              >
                <Image
                  source={ImagePath.MicGear}
                  style={styles.Img}
                />
                <Text style={styles.topButtonText}>AV Settings</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.AVSettingTouch}
                onPress={() => {
                  navigation.navigate('Grouping')
                }}
              >
                <Image
                  source={ImagePath.Group}
                  style={styles.Img}
                />
                <Text style={styles.topButtonText}>Grouping</Text>
              </TouchableOpacity>

            </View>


            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity style={styles.AVSettingTouch}
                onPress={() => {
                  navigation.navigate('Participants')
                }}
              >
                <Image
                  source={ImagePath.Participant}
                  style={styles.Img}
                />
                <Text style={styles.topButtonText}>Participants</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.AVSettingTouch}
                onPress={() => {
                  navigation.navigate('SessionPlan')
                }}
              >
                <Image
                  source={ImagePath.Task}
                  style={styles.Img}
                />
                <Text style={styles.topButtonText}>Seesion Plan</Text>
              </TouchableOpacity>

            </View>


          </View>


        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default RemoteMain;

const styles = StyleSheet.create({
  background: { flex: 1, backgroundColor: '#1E2228' },
  safe: {  marginTop: 10 },
  container: { padding: 16, paddingBottom: 60 },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  topButton: {
    width: wp(40),
    height: hp(5),
    backgroundColor: '#2A2A2A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  topButtonText: { color: '#fff', fontSize: 12 },

  panel: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 30,
    padding: 10,
    alignItems: 'center',
    marginTop: hp(7),
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100
  },

  trainerImageMock: {
    width: wp(50),
    height: hp(14),
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: -hp(8),
    // backgroundColor: '#2D3440'
  },

  trainerName: {
    color: '#fff',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },

  quickActions: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2)
  },

  circleIcon: {
    width: wp(15),
    height: hp(6),
    borderRadius: 16,
    backgroundColor: '#3A3A3A',
    justifyContent: 'center',
    alignItems: 'center',
  },

  actionText: { color: '#fff', fontSize: 9 },

  playView: {
    marginTop: 1,
    width: '100%',
    backgroundColor: '#111',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  },

  playTxt: { color: '#f5c542', fontSize: 12 },

  circleWrapper: {
    width: wp(75),
    height: hp(29),
    marginTop: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },

  remoteOuterView: {
    width: wp(45),
    height: wp(45),
    borderRadius: wp(26),
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom:hp(6)
  },

  remoteInnerView: {
    width: wp(32),
    height: wp(32),
    borderRadius: wp(17),
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
  },

  topArrow: { position: 'absolute', top: 1 },
  leftArrow: { position: 'absolute', left: 1 },
  rightArrow: { position: 'absolute', right: 1 },
  bottomArrow: { position: 'absolute', bottom: 1 },

  topCircleLabel: { position: 'absolute', top: 10, color: '#fff', fontSize: 10, textAlign: 'center' },
  leftCircleLabel: { position: 'absolute', left: 0, color: '#fff', fontSize: 10, textAlign: 'center', },
  rightCircleLabel: { position: 'absolute', right: 0, color: '#fff', fontSize: 10, textAlign: 'center' },
  bottomCircleLabel: { position: 'absolute', bottom: 10, color: '#fff', fontSize: 10, textAlign: 'center' },

  EndImg: {
    width: wp(5),
    height: hp(5),
    resizeMode: 'contain',
  },

  cameraOffContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor:'#3a3a3a'
  },

  cameraOffText: { color: '#fff' },

  forcTouch: {
    width: wp(13),
    height: hp(6),
    backgroundColor: '#3A3A3A',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 75

  },
  forcTouchView: {
    width: wp(23), alignItems: 'center',
  },

  bottomView: {
    width: wp(90),
    height: hp(13),
    marginTop: 10,
    justifyContent: 'space-between'
  },

  AVSettingTouch: {
    width: wp(40),
    height: hp(5),
    backgroundColor: '#2A2A2A',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 0.2,
    borderColor: '#fff',
    elevation: 8,
    paddingHorizontal: wp(3),
  },
  Img: {
    width: wp(7),
    height: hp(10),
    resizeMode: 'contain',
  },
  line: {
    width: '100%',
    height: 2,
    backgroundColor: '#ccc',
    marginVertical: 10,

  },
});