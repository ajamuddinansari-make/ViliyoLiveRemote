import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import DraggableFlatList from 'react-native-draggable-flatlist';

import Header from '../components/Header';
import BottomControlPanel from '../components/BottomControlPanel';
import { ImagePath } from '../assets/ImagePath';
import { hp, wp } from '../components/Responsive';

const SessionPlan = ({ navigation }: any) => {

  const [data, setData] = useState([
    { id: 'h1', type: 'header', title: 'SEGMENT 1' },
    { id: '1', type: 'item', title: 'ROLE PLAY', subtitle: '<Role Play Title>', image: ImagePath.Drama },
    { id: '2', type: 'item', title: 'ROLE PLAY', subtitle: '<Role Play Title>', image: ImagePath.Drama },

    { id: 'h2', type: 'header', title: 'SEGMENT 2' },
    { id: '3', type: 'item', title: 'CASE STUDY', subtitle: '<Case Study Title>', image: ImagePath.Search },
    { id: '4', type: 'item', title: 'GROUP DISCUSSION', subtitle: '<GD Title>', image: ImagePath.Vector },
    { id: '5', type: 'item', title: 'POLL', subtitle: '<Poll Title>', image: ImagePath.Poll },
  ]);


  const [playingId, setPlayingId] = useState<string | null>(null);

  const togglePlay = (id: string) => {
    setPlayingId(prev => (prev === id ? null : id));
  };

  const Card = ({ item, drag, isActive }: any) => (
    <TouchableOpacity
      onLongPress={item.type === 'item' ? drag : undefined}
      disabled={isActive || item.type === 'header'}
      style={{ width: wp(90), alignSelf: 'center', }}
    >


      {item.type === 'header' ? (
        <Text style={styles.sectionTitle}>{item.title}</Text>
      ) : (

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>


          <View style={[styles.card, isActive && styles.activeCard]}>

            <View style={styles.left}>
              <Image source={item.image} style={styles.editBtn} />
              <Text style={styles.time}>120 mins</Text>
            </View>

            <View style={styles.center}>
              <Text style={styles.cardTitle}>
                <Text style={{ fontWeight: 'bold' }}>{item.title} </Text>
              </Text>
              <Text style={styles.subTitle}>{item.subtitle}</Text>
            </View>
       <View style={styles.verticalLine} />
            <View style={styles.right}>
              <TouchableOpacity style={styles.iconBtn}>
                <Image source={ImagePath.Edit} style={styles.editBtn} />
              </TouchableOpacity>
            </View>

          </View>


          <TouchableOpacity
            style={[
              styles.playBtn,
              playingId === item.id && styles.playBtnActive,
            ]}
            onPress={() => togglePlay(item.id)}
          >
            <Image
              source={
                playingId === item.id
                  ? ImagePath.Pause
                  : ImagePath.Play
              }
              style={styles.playImg}
            />
          </TouchableOpacity>

        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <ImageBackground source={ImagePath.backgroundImg} style={styles.background}>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>

        <Header
          title="SESSION PLAN"
          onBackPress={() => navigation.goBack()}
        />

        <DraggableFlatList
          data={data}
          keyExtractor={(item) => item.id}
          onDragEnd={({ data }) => setData(data)}
          renderItem={({ item, drag, isActive }) => (
            <Card item={item} drag={drag} isActive={isActive} />
          )}
        />

      </SafeAreaView>

      <BottomControlPanel
        onForceMute={() => console.log('Force Mute')}
        onSystemMute={() => console.log('System Mute')}
        onAnnouncement={() => console.log('Announcement')}
        onConfirm={() => console.log('Confirm')}
      />
    </ImageBackground>
  );
};

export default SessionPlan;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#1E2228',
  },

  sectionTitle: {
    color: '#ccc',
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
    fontSize: 14,
  },

  card: {
    width: wp(70),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#35363C',
    borderRadius: 12,
    padding: 3,
  },

  activeCard: {
    // backgroundColor: '#6b5b2c',
  },

  playBtnActive: {
    borderColor: '#6b5b2c',
  },
  left: {
    alignItems: 'center',
    marginLeft:5
  },

  time: {
    color: '#ccc',
    fontSize: 10,
    marginTop: 5,
  },

  center: {
    flex: 1,
    paddingHorizontal: 10,
    alignItems:'flex-end',
    borderRightWidth:1,
    borderColor:'#fff',
    marginRight:5
  },

  cardTitle: {
    color: '#fff',
    fontSize: 11,
  },

  subTitle: {
    color: '#ccc',
    fontSize: 13,
    marginTop: 3,
  },

  right: {
    width: wp(10),
    alignItems: 'center',
  },

  iconBtn: {
    backgroundColor: '#333',
    padding: 8,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  editBtn: {
    width: wp(6),
    height: hp(2.5),
    resizeMode: 'contain',
  },

  playBtn: {
    width: 55,
    height: 55,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#888',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginBottom: 5,
    marginTop:5
  },

  playImg: {
    width: wp(8),
    height: hp(5),
    resizeMode: 'contain',
  },
  verticalLine:{
    width:1, 
    height:50,
    color:'red'

  }
});