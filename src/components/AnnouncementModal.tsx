import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { hp, wp } from './Responsive';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSend?: () => void;
}

const AnnouncementModal = ({ visible, onClose, onSend }: Props) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
  <TouchableOpacity
    activeOpacity={1}
    style={styles.overlay}
    onPress={onClose}
  >
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={(e) => e.stopPropagation()} 
    >
      <Text style={styles.title}>Announcement</Text>

      <Text style={styles.message}>
        This is your announcement message
      </Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
          <Text style={styles.btnText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sendBtn} onPress={onSend}>
          <Text style={styles.btnText}>Send</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  </TouchableOpacity>
</Modal>
  );
};

export default AnnouncementModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    width: wp(80),
    backgroundColor: '#2C2C2E',
    borderRadius: 12,
    padding: 20,
  },

  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  message: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 20,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  cancelBtn: {
    flex: 1,
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
  },

  sendBtn: {
    flex: 1,
    backgroundColor: '#6b5b2c',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },

  btnText: {
    color: '#fff',
    fontSize: 14,
  },
});