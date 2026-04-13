import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SystemSetting from 'react-native-system-setting';

interface VolumeButtonProps {
  initialVolume?: boolean; 
}

const VolumeButton: React.FC<VolumeButtonProps> = ({ initialVolume = true }) => {
  const [volumeOn, setVolumeOn] = useState(initialVolume);
  const [previousVolume, setPreviousVolume] = useState(0.5); 

  useEffect(() => {
  
    SystemSetting.getVolume('music').then((v) => setPreviousVolume(v));
  }, []);

  const toggleVolume = async () => {
    if (volumeOn) {
   
      const currentVolume = await SystemSetting.getVolume('music');
      setPreviousVolume(currentVolume);
      await SystemSetting.setVolume(0, { type: 'music' }); 
      setVolumeOn(false);
    } else {
      await SystemSetting.setVolume(previousVolume, { type: 'music' }); 
      setVolumeOn(true);
    }
  };

  return (
    <TouchableOpacity
      style={{
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: volumeOn ? '#3a3a3a' : 'red',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth:2,
         borderColor: volumeOn ? '#f5c542': 'red',
      }}
      onPress={toggleVolume}
    >
      <MaterialCommunityIcons
        name={volumeOn ? 'volume-high' : 'volume-off'}
        size={28}
        color="#fff"
      />
    </TouchableOpacity>
  );
};

export default VolumeButton;