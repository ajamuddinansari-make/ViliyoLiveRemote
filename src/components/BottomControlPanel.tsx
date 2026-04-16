import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useCall } from '../context/CallContext';
import { hp, wp } from './Responsive';

type Props = {
  onForceMute?: () => void;
  onSystemMute?: () => void;
  onAnnouncement?: () => void;
  onConfirm?: () => void;
};

const BottomControlPanel: React.FC<Props> = ({
  onForceMute,
  onSystemMute,
  onAnnouncement,
  onConfirm,
}) => {
  const {
    isCameraOn,
    isMicOn,
    isSpeakerOn,
    toggleCamera,
    toggleMic,
    toggleSpeaker,
  } = useCall();

  
  return (
    <LinearGradient
      colors={['#515050', '#1B1F24', '#111']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.bottomPanel}
    >

     
      <View style={[styles.cameraOffContainer,{justifyContent:'space-evenly'}]}>

        <TouchableOpacity style={styles.circleIcon} onPress={toggleCamera}>
          <MaterialCommunityIcons
            name={isCameraOn ? 'video-outline' : 'video-off'}
            size={25}
            color="#fff"
          />
          <Text style={styles.actionText}>Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.circleIcon}>
          <MaterialCommunityIcons
            name="camera-flip-outline"
            size={22}
            color="#fff"
          />
          <Text style={styles.actionText}>Flip</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.circleIcon} onPress={toggleMic}>
          <MaterialCommunityIcons
            name={isMicOn ? 'microphone-outline' : 'microphone-off'}
            size={22}
            color="#fff"
          />
          <Text style={styles.actionText}>Mic</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.circleIcon} onPress={toggleSpeaker}>
          <MaterialCommunityIcons
            name={isSpeakerOn ? 'volume-high' : 'volume-off'}
            size={22}
            color="#fff"
          />
          <Text style={styles.actionText}>Speaker</Text>
        </TouchableOpacity>

      </View>

  
      <View style={[styles.cameraOffContainer,{paddingTop:10, justifyContent: 'space-around'}]}>

   
        <View>
          <TouchableOpacity
            style={styles.circleBtnBottom}
            onPress={onForceMute}
          >
            <MaterialCommunityIcons
              name="account-multiple-remove"
              size={25}
              color="#fff"
            />
          </TouchableOpacity>
          <Text style={styles.roundText}>Force Mute</Text>
        </View>

      
        <View>
          <TouchableOpacity
            style={styles.circleBtnBottom}
            onPress={onSystemMute}
          >
            <MaterialCommunityIcons
              name="microphone-outline"
              size={22}
              color="#fff"
            />
          </TouchableOpacity>
          <Text style={styles.roundText}>System Mute</Text>
        </View>

      
        <View>
          <TouchableOpacity
            style={styles.circleBtnBottom}
            onPress={onAnnouncement}
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
            onPress={onConfirm}
          >
            <MaterialCommunityIcons
              name="check-circle-outline"
              size={25}
              color="#fff"
            />
          </TouchableOpacity>
          <Text style={styles.roundText}>Confirm</Text>
        </View>

      </View>
    </LinearGradient>
  );
};

export default BottomControlPanel;
const styles = StyleSheet.create({
  bottomPanel: {
    // paddingVertical: 15,
    // paddingHorizontal: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop:20,
     paddingBottom: Platform.OS === 'ios' ? -20 : 0, 
     height: Platform.OS === 'ios' ? hp(21) : hp(24)
  },

  cameraOffContainer: {
    width:wp(85),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf:'center'
  },

  circleIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(14),
    height:hp(6),
    backgroundColor:'#3a3a3a',
    borderRadius:10
  },

  actionText: {
    color: '#fff',
    fontSize: 10,
    // marginTop: 6,
    textAlign: 'center',
  },

  circleBtnBottom: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#2C2C2C',
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 5,
  },

  roundText: {
    color: '#fff',
    fontSize: 8,
    marginTop: 6,
    textAlign: 'center',
  },
});