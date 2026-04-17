import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ImagePath } from '../assets/ImagePath';
import { wp, hp } from '../components/Responsive';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BackgroundEffect from '../components/BackgroundEffect';
import {
  mediaDevices,
  RTCView,
  MediaStream,
} from 'react-native-webrtc';
import InCallManager from 'react-native-incall-manager';
import { useCall } from '../context/CallContext';
import { BackHandler } from 'react-native';

const ConnectScreen = ({ navigation }: any) => {

  const {
    localStream,
    setLocalStream,
    isRemoteAccessAllowed,
    setIsRemoteAccessAllowed,
    currentEffect,
    setCurrentEffect,
    isMicOn,
    isSpeakerOn,
    isCameraOn,
    toggleMic,
    toggleCamera,
    toggleSpeaker,
  } = useCall();



  const [cameraPosition, setCameraPosition] = useState<'front' | 'environment'>('front');





  const effectMap: Record<string, any> = {
    effect1: ImagePath.BackgroundEffect1,
    effect2: ImagePath.ViliyoLogo,
    effect3: ImagePath.BackgroundEffect,
    effect4: ImagePath.BackgroundEffect,
  };

  useEffect(() => {
    initCallPreview();

    return () => {
      setLocalStream(prev => {
        prev?.getTracks().forEach(track => track.stop());
        return null;

      });

      InCallManager.stop();
    };
  }, []);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      const result = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);

      return (
        result['android.permission.CAMERA'] === 'granted' &&
        result['android.permission.RECORD_AUDIO'] === 'granted'
      );
    }
    return true;
  };


  const initCallPreview = async () => {
    try {
      const granted = await requestPermissions();
      if (!granted) return;

      const stream = await mediaDevices.getUserMedia({
        audio: true,
        video: {
          facingMode: cameraPosition,
          width: 720,
          height: 1280,
          frameRate: 30,
        },
      });

      const audioTrack = stream.getAudioTracks()[0];
      const videoTrack = stream.getVideoTracks()[0];

      if (audioTrack) {
        audioTrack.enabled = isMicOn;
      }

      if (videoTrack) {
        videoTrack.enabled = isCameraOn;
      }

      setLocalStream(stream);

      InCallManager.start({ media: 'video' });
      InCallManager.setForceSpeakerphoneOn(isSpeakerOn);
    } catch (error) {
      console.log('WebRTC preview error:', error);
    }
  };

  const remoteMain = () => {
    navigation.navigate('RemoteMain');
  };



  return (
    <ImageBackground source={ImagePath.backgroundImg} style={styles.background}>
      <SafeAreaView style={styles.container}>


        <Text style={styles.label}>
          Programme: <Text style={styles.value}>{'<Programme Name>'}</Text>
        </Text>

        <Text style={styles.label}>
          Session: <Text style={styles.value}>{'<Session Name>'}</Text>
        </Text>

        <View style={styles.line} />

        <View style={styles.checkboxRow}>
          <TouchableOpacity
            style={[
              styles.checkbox,
              isRemoteAccessAllowed && styles.checkboxActive,
            ]}
            onPress={() =>
              setIsRemoteAccessAllowed(!isRemoteAccessAllowed)
            }
          >
            {isRemoteAccessAllowed && <Text style={styles.tick}>✓</Text>}
          </TouchableOpacity>

          <Text style={styles.checkboxText}>
            ALLOW ACCESS TO VIDEO / AUDIO FOR REMOTE
          </Text>

          <MaterialCommunityIcons
            name="information-outline"
            size={25}
            color="#fff"
          />
        </View>

        <View style={styles.card}>
          <View style={styles.trainerImg}>
            {isRemoteAccessAllowed && localStream && isCameraOn ? (
              <>
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
              </>
            ) : (
              <View style={[styles.trainerImg, styles.center]}>
                <MaterialCommunityIcons
                  name="video-off"
                  size={40}
                  color="#fff"
                />
                <Text style={styles.message}>
                  {isRemoteAccessAllowed
                    ? 'Camera is Off'
                    : 'No access to camera and audio is granted'}
                </Text>
              </View>
            )}
          </View>

          <Text style={styles.trainerName}>You</Text>

          <View style={styles.controls}>

            <View style={styles.group}>

              <TouchableOpacity style={styles.icon}>
                <MaterialCommunityIcons
                  name="chevron-up"
                  size={28}
                  color="#fff"
                />
              </TouchableOpacity>

              <TouchableOpacity
                disabled={!isRemoteAccessAllowed}
                style={[
                  styles.icon,
                  isCameraOn && styles.activeIcon,
                  {
                    backgroundColor: !isRemoteAccessAllowed ? '#666' : isCameraOn ? '#3a3a3a' : 'red',
                    opacity: isRemoteAccessAllowed ? 1 : 0.5,borderColor: !isRemoteAccessAllowed ?'#2D3037':'#f5c542'

                  }
                ]}
                onPress={toggleCamera}
              >
                <MaterialCommunityIcons
                  name={isCameraOn ? 'video-outline' : 'video-off'}
                  size={28}
                  color="#fff"
                />
              </TouchableOpacity>

            </View>

            <View>
              <TouchableOpacity
              disabled={!isRemoteAccessAllowed}
                style={[
                  styles.icon, isSpeakerOn && styles.activeIcon,
                  {backgroundColor : !isRemoteAccessAllowed ? '#666' : isSpeakerOn ? '#3a3a3a' : 'red', 
                    opacity: isRemoteAccessAllowed ? 1 : 0.5,borderColor: !isRemoteAccessAllowed ?'#2D3037':'#f5c542'
                  }
                  
                ]}
                onPress={toggleSpeaker}
              >
                <MaterialCommunityIcons
                  name={isSpeakerOn ? 'volume-high' : 'volume-off'}
                  size={28}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.group}>


              <TouchableOpacity style={styles.icon}>
                <MaterialCommunityIcons
                  name="chevron-up"
                  size={28}
                  color="#fff"
                />
              </TouchableOpacity>


              <TouchableOpacity
              disabled={!isRemoteAccessAllowed}
                style={[
                  styles.icon,
                  isMicOn && styles.activeIcon,
                  {backgroundColor : !isRemoteAccessAllowed ? '#666' : isMicOn ? '#3a3a3a' : 'red', 
                opacity: isRemoteAccessAllowed ? 1 : 0.5, borderColor: !isRemoteAccessAllowed ?'#2D3037':'#f5c542'
                  }
                ]}
                onPress={toggleMic}
              >
                <MaterialCommunityIcons
                  name={isMicOn ? 'microphone-outline' : 'microphone-off'}
                  size={28}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>

         
            <BackgroundEffect
              currentEffect={currentEffect}
              onApply={setCurrentEffect}
              disabled={!isRemoteAccessAllowed}
            />
          
          </View>
        </View>

        <TouchableOpacity style={styles.joinBtn} onPress={remoteMain}>
          <Text style={styles.joinText}>JOIN NOW</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ConnectScreen;

const styles = StyleSheet.create({
  background: { flex: 1, backgroundColor: '#2D3037' },
  container: { flex: 1, padding: 20 },

  label: { color: '#ccc', marginBottom: 10 },
  value: { color: '#fff', fontWeight: '600' },

  line: {
    height: 2,
    backgroundColor: '#ccc',
    marginVertical: 20,
  },

  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkboxActive: {
    backgroundColor: '#444',
    borderColor: '#f5c542',
  },

  tick: { color: '#f5c542' },

  checkboxText: { color: '#ccc', flex: 1, fontSize: 11 },

  card: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 30,
  },

  trainerImg: {
    width: '100%',
    height: 200,
  },

  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  trainerName: {
    position: 'absolute',
    bottom: 80,
    right: 15,
    color: '#fff',
    fontWeight: '600',
  },

  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#2c2c2c',
  },

  group: {
    width: wp(20),
    flexDirection: 'row',
    backgroundColor: '#2D3037',
    borderRadius: 25,

  },

  icon: {
    width: wp(12),
    height: hp(5.5),
    borderRadius: 25,
    backgroundColor: '#2D3037',
    justifyContent: 'center',
    alignItems: 'center',
  },

  activeIcon: {
    borderWidth: 2,
    borderColor: '#f5c542',
  },

  joinBtn: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#00ff88',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },

  joinText: {
    color: '#fff',
    fontWeight: '600',
  },

  message: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
  },
});