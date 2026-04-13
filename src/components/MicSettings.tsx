
import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    GestureResponderEvent,
    TouchableWithoutFeedback
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
interface MicSettingsProps {
    initialMic?: boolean;
    onMicChange?: (mic: boolean) => void; 
}

const MicSettings: React.FC<MicSettingsProps> = ({ initialMic = true, onMicChange }) => {
    const [mic, setMic] = useState<boolean>(initialMic);
    const [visible, setVisible] = useState<boolean>(false);

    const toggleMic = () => {
        setMic(prev => {
            const newMic = !prev;
            onMicChange?.(newMic); 
            return newMic;
        });
    };

    return (
        <View>
            <TouchableOpacity style={styles.icon} onPress={() => setVisible(!visible)}>
                <MaterialCommunityIcons 
                    name={visible ? 'chevron-down' : 'chevron-up'} 
                    size={28} 
                    color="#fff" 
                />
            </TouchableOpacity>

            <Modal
                visible={visible}
                transparent
                animationType="slide"
                onRequestClose={() => setVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setVisible(false)}>
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Audio Settings</Text>

                                {/* <TouchableOpacity
                                    style={[styles.option, { backgroundColor: mic ? '#3a3a3a' : 'red' }]}
                                    onPress={toggleMic}
                                >
                                    <MaterialCommunityIcons
                                        name={mic ? 'microphone-outline' : 'microphone-off'}
                                        size={28}
                                        color="#fff"
                                    />
                                    <Text style={styles.optionText}>{mic ? 'Mic On' : 'Mic Off'}</Text>
                                </TouchableOpacity> */}

                                <TouchableOpacity style={styles.closeButton} onPress={() => setVisible(false)}>
                                    <Text style={styles.closeText}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

export default MicSettings;

const styles = StyleSheet.create({
    icon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#2D3037',
        justifyContent: 'center',
        alignItems: 'center',
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
        marginBottom: 20,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    optionText: {
        color: '#fff',
        marginLeft: 10,
        fontSize: 16,
    },
    closeButton: {
        alignSelf: 'center',
        padding: 12,
        borderRadius: 10,
        backgroundColor: '#444',
        marginTop: 10,
    },
    closeText: {
        color: '#fff',
        fontWeight: '600',
    },
});