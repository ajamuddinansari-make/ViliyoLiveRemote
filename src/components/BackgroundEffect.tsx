import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  Image,
} from 'react-native';
import { wp, hp } from '../components/Responsive';
import { ImagePath } from '../assets/ImagePath';
import { EffectType } from '../context/CallContext';

interface BackgroundEffectProps {
  onApply: (effect: EffectType) => void;
  currentEffect?: EffectType;
}

const effects: {
  id: EffectType;
  label: string;
  source: any;
}[] = [
  { id: '', label: 'None', source: null },
  {
    id: 'effect1',
    label: 'Effect 1',
    source: ImagePath.BackgroundEffect1,
  },
  {
    id: 'effect2',
    label: 'Effect 2',
    source: ImagePath.ViliyoLogo,
  },
  {
    id: 'effect3',
    label: 'Effect 3',
    source: ImagePath.BackgroundEffect,
  },
  {
    id: 'effect4',
    label: 'Effect 4',
    source: ImagePath.BackgroundEffect,
  },
];

const BackgroundEffect: React.FC<BackgroundEffectProps> = ({
  onApply,
  currentEffect,
}) => {
  const [visible, setVisible] = useState(false);

  const [selectedEffect, setSelectedEffect] =
    useState<EffectType>(currentEffect || '');

  useEffect(() => {
    setSelectedEffect(currentEffect || '');
  }, [currentEffect]);

  const getImageSource = () => {
    const found = effects.find(
      effect => effect.id === currentEffect
    );

    return found?.source || ImagePath.BackgroundEffect;
  };

  return (
    <View>
   
      <TouchableOpacity
        style={styles.icon}
        onPress={() => setVisible(true)}
      >
        <Image
          source={getImageSource()}
          style={styles.iconImage}
          resizeMode="cover"
        />
      </TouchableOpacity>

     
      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Select Background Effect
            </Text>

            <FlatList
              data={effects}
              keyExtractor={item => item.id || 'none'}
              numColumns={2}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.effectItem,
                    selectedEffect === item.id &&
                      styles.selectedEffect,
                  ]}
                  onPress={() => setSelectedEffect(item.id)}
                >
                  <Image
                    source={
                      item.source ||
                      ImagePath.BackgroundEffect
                    }
                    style={styles.effectImage}
                  />
                  <Text style={styles.effectLabel}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              style={styles.applyBtn}
              onPress={() => {
                onApply(selectedEffect);
                setVisible(false);
              }}
            >
              <Text style={styles.applyText}>Apply</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setVisible(false)}
            >
              <Text style={styles.closeText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BackgroundEffect;

const styles = StyleSheet.create({
  icon: {
    width: wp(12),
    height: hp(5.5),
    borderRadius: 25,
    backgroundColor: '#2D3037',
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconImage: {
    width: wp(8),
    height: hp(4),
    borderRadius: 20,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },

  modalContent: {
    backgroundColor: '#1E1E1E',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  modalTitle: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '600',
  },

  effectItem: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'transparent',
    padding: 5,
  },

  selectedEffect: {
    borderColor: '#00ff88',
  },

  effectImage: {
    width: wp(20),
    height: hp(10),
    borderRadius: 10,
  },

  effectLabel: {
    color: '#fff',
    marginTop: 5,
    fontSize: 12,
  },

  applyBtn: {
    backgroundColor: '#00ff88',
    padding: 12,
    borderRadius: 25,
    marginTop: 15,
    alignItems: 'center',
  },

  applyText: {
    color: '#000',
    fontWeight: '600',
  },

  closeText: {
    color: '#ccc',
    textAlign: 'center',
    marginTop: 10,
  },
});