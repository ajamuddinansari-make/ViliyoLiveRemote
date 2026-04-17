import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RTCView } from 'react-native-webrtc';
import { hp, wp } from './Responsive';
import BackgroundEffect from './BackgroundEffect';

type Props = {
  title: string;
  streamURL?: string;

  isTrainerPcCameraOn: boolean;
  isTrainerPcMicOn: boolean;
  isTrainerPcSpeakerOn: boolean;

  cameraPosition: 'front' | 'back';

  currentEffect: string;

  onToggleCamera: () => void;
  onToggleMic: () => void;
  onToggleSpeaker: () => void;
  onFlipCamera?: () => void;
  onEffectChange?: (effect: string) => void;
};

const TrainerConsole: React.FC<Props> = ({
  title,
  streamURL,
  isTrainerPcCameraOn,
  isTrainerPcMicOn,
  isTrainerPcSpeakerOn,
  cameraPosition,
  currentEffect,
  onToggleCamera,
  onToggleMic,
  onToggleSpeaker,
  onFlipCamera,
}) => {
  return (
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
            {streamURL && isTrainerPcCameraOn ? (
              <RTCView
                streamURL={streamURL}
                style={StyleSheet.absoluteFill}
                objectFit="cover"
                mirror={cameraPosition === 'front'}
              />
            ) : null}

            <Text style={styles.trainerName}>Trainer Name</Text>
          </View>

          
          <View style={styles.controls}>

          
            <View style={{ flexDirection: 'row' }}>

              <View style={styles.group}>
                
                <TouchableOpacity style={styles.icon}>
                  <MaterialCommunityIcons
                    name="chevron-up"
                    size={25}
                    color="#fff"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.circleBtn,
                    { backgroundColor: isTrainerPcCameraOn ? '#3a3a3a' : 'red' },
                  ]}
                  onPress={onToggleCamera}
                >
                  <MaterialCommunityIcons
                    name={isTrainerPcCameraOn ? 'video-outline' : 'video-off'}
                    size={22}
                    color="#fff"
                  />
                </TouchableOpacity>

              </View>

              <View>
                <TouchableOpacity style={[styles.circleBtn, { marginLeft: 10 }]}>
                  <BackgroundEffect
                    // currentEffect={currentEffect}
                    onApply={() => {}}
                  />
                </TouchableOpacity>
              </View>

            </View>

          
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                justifyContent: 'space-between',
              }}
            >

              <View>
                <TouchableOpacity
                  style={[
                    styles.circleBtn,
                    { backgroundColor: isTrainerPcSpeakerOn ? '#3a3a3a' : 'red' },
                  ]}
                  onPress={onToggleSpeaker}
                >
                  <MaterialCommunityIcons
                    name={isTrainerPcSpeakerOn ? 'volume-high' : 'volume-off'}
                    size={22}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.group}>

                <TouchableOpacity style={styles.icon}>
                  <MaterialCommunityIcons
                    name="chevron-up"
                    size={25}
                    color="#fff"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.circleBtn,
                    { backgroundColor: isTrainerPcMicOn ? '#3a3a3a' : 'red' },
                  ]}
                  onPress={onToggleMic}
                >
                  <MaterialCommunityIcons
                    name={isTrainerPcMicOn ? 'microphone-outline' : 'microphone-off'}
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
  );
};

export default TrainerConsole;

const styles = StyleSheet.create({
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
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
    justifyContent: 'space-evenly',
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

  controls: {},

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
    alignItems: 'center',
  },

  circleBtn: {
    width: 45,
    height: 45,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#FFC107',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2D3037',
  },
});