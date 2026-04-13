import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';


import Splash from '../auth/Splash';
import Login from '../auth/Login';
import SessionList from '../screen/SessionList';
import ConnectScreen from '../screen/ConnectScreen';
import RemoteMain from '../screen/RemoteMain';

import { CallProvider } from '../context/CallContext';
import AvSetting from '../screen/AvSetting';
import Grouping from '../screen/Grouping';
import Participants from '../screen/Participants';
import SessionPlan from '../screen/SessionPlan';



export type RootStackParamList = {
    Splash : undefined;
    Login : undefined; 
    SessionList: undefined;
    ConnectScreen: undefined;
    RemoteMain:undefined;
    AvSetting: undefined;
    Grouping: undefined;
    Participants: undefined;
    SessionPlan: undefined;
}



const Stack = createNativeStackNavigator<RootStackParamList>()

const AppNavigator = () => {
  return (
    // <View>
    //   <Text>AppNavigator</Text>
    // </View>
    <CallProvider>
   <NavigationContainer >
       <Stack.Navigator initialRouteName='Splash' screenOptions={{headerShown : false}}>
            <Stack.Screen name='Splash' component={Splash}  />
             <Stack.Screen name='Login' component={Login}/>
             <Stack.Screen name='SessionList' component={SessionList}/>
             <Stack.Screen name='ConnectScreen' component={ConnectScreen} />
             <Stack.Screen name='RemoteMain' component={RemoteMain}/>
             
             <Stack.Screen name='AvSetting' component={AvSetting}/>
             <Stack.Screen name='Grouping' component={Grouping}/>
             <Stack.Screen name='Participants' component={Participants}/>
             <Stack.Screen name='SessionPlan' component={SessionPlan}/>
       </Stack.Navigator>

   </NavigationContainer>
</CallProvider>


  )
}

export default AppNavigator