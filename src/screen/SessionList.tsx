import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ImagePath } from '../assets/ImagePath';
import { wp, hp } from '../components/Responsive'

const DATA = [
  { id: '1', active: true },
  { id: '2', active: false },
  { id: '3', active: false },
];




const SessionList = ({navigation} : any) => {



const handleConnect = () => {
  console.log("ConnectScreen....")
     navigation.navigate('ConnectScreen');
}


  const renderItem = ({ item }: any) => (
    <View style={[styles.card, item.active && styles.activeCard]}>
      
      <Text style={styles.label}>
        Programme:      <Text style={styles.value}>{'<Programme Name>'}</Text>
      </Text>

      <Text style={styles.label}>
        Session:             <Text style={styles.value}>{'<Session Name>'}</Text>
      </Text>

      <View style={styles.row}>
        <View>
          <Text style={styles.subLabel}>Date:</Text>
          <Text style={styles.bold}>14 Feb 2025</Text>
        </View>

        <View style={styles.divider} />

        <View>
          <Text style={styles.subLabel}>Time:</Text>
          <Text style={styles.bold}>11:00 - 13:00</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            item.active ? styles.activeBtn : styles.disabledBtn,
          ]}
          disabled={!item.active}
          onPress={handleConnect}
        >
          <Text style={styles.btnText}>CONNECT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ImageBackground source={ImagePath.backgroundImg} style={styles.background}>
      <SafeAreaView style={styles.container}>
        
       
        <Text style={styles.title}>
          WELCOME {'<TRAINEE NAME>'}
        </Text>

       
        <Text style={styles.section}>Session (s)</Text>
        <View style={styles.line} />

       
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />

      </SafeAreaView>
    </ImageBackground>
  );
};

export default SessionList;


const styles = StyleSheet.create({
  background: {
    flex: 1,
   backgroundColor:'#2D3037'

  },

  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 20,
    textAlign:'center'
  },

  section: {
    color: '#ccc',
    fontSize: 16,
  },

  line: {
    height: 2,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },

  card: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
  },

  activeCard: {
    borderWidth: 1,
    borderColor: '#00ff88',
  },

  label: {
    color: '#aaa',
    marginBottom: 5,
  },

  value: {
    color: '#fff',
    fontWeight: '500',
  },

  subLabel: {
    color: '#aaa',
    fontSize: 12,
  },

  bold: {
    color: '#fff',
    fontWeight: '600',
    fontSize:13
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  divider: {
    width: 1,
    height: 40,
    backgroundColor: '#666',
    marginHorizontal: 15,
  },

  button: {
    marginLeft: 'auto',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop:hp(1)
  },

  activeBtn: {
    borderWidth: 1,
    borderColor: '#00ff88',
  },

  disabledBtn: {
    backgroundColor: '#444',
  },

  btnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12
  },
});