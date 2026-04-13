import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

import { hp, wp } from './Responsive';
import { ImagePath } from '../assets/ImagePath';

interface HeaderProps {
  title: string;
  onBackPress: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onBackPress }) => {
  const words = title.split(' ');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Text style={styles.boldText}>{words[0]} </Text>
        <Text style={styles.normalText}>
          {words.slice(1).join(' ')}
        </Text>
      </Text>

      <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
        <Image
          source={ImagePath.Back}
          style={styles.backImg}
        />
        <Text style={styles.BackTxt}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop:10
  },

  backButton: {
    width: wp(18),
    height: hp(8),
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
  },

  title: {
    flex: 1,
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginLeft: wp(18),
  },

  boldText: {
    fontWeight: '800',
  },

  normalText: {
    fontWeight: '400',
  },

  backImg: {
    width: wp(5),
    height: hp(4),
    resizeMode: 'contain',
  },

  BackTxt: {
    color: '#fff',
  },
});