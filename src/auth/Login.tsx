import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image, Linking } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ImagePath } from '../assets/ImagePath'
import { wp, hp } from '../components/Responsive'
import Ionicons from 'react-native-vector-icons/Ionicons'


const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginMethod, setLoginMethod] = useState<'password' | 'otp'>('password')
  const [showPassword, setShowPassword] = useState(false)

  const [otp, setOtp] = useState('')

  const handleLogin = () => {
    navigation.replace('SessionList');
  }

  const handleForgote = async () => {

    try {
      await Linking.openURL('https://learner.viliyo.com/forgot-password')
    } catch (error) {
      console.log('Cannot open forgot password page', error);

    }

  }

  return (
    <ImageBackground source={ImagePath.backgroundImg} style={styles.background}>
      <SafeAreaView style={styles.container}>

        <View style={styles.card}>

          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            <Text style={[styles.title, { fontWeight: 'bold' }]}>TRAINER'S </Text>
            <Text style={styles.title}>REMOTE</Text>
          </View>

          <Text style={styles.loginText}>LOGIN</Text>

          <TextInput
            placeholder="Enter Email ID"
            placeholderTextColor="#999"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View style={styles.radioContainer}>
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => setLoginMethod('password')}
            >
              <View style={[styles.radioCircle, loginMethod === 'password' && styles.radioSelected]} />
              <Text style={styles.radioLabel}>With Password</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => setLoginMethod('otp')}
            >
              <View style={[styles.radioCircle, loginMethod === 'otp' && styles.radioSelected]} />
              <Text style={[styles.radioLabel, loginMethod === 'otp' && { fontWeight: '300' }]}>
                With OTP on Email
              </Text>
            </TouchableOpacity>
          </View>

          {loginMethod === 'password' ? (
            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Enter Password"
                placeholderTextColor="#999"
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? 'eye' : 'eye-off'}
                  size={22}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>
          ) : (
            <TextInput
              placeholder="Enter OTP"
              placeholderTextColor="#999"
              style={styles.input}
              value={otp}
              onChangeText={setOtp}
              keyboardType="number-pad"
              maxLength={6} 
            />
          )}
          <TouchableOpacity
            style={{ alignSelf: 'flex-end' }}

            onPress={handleForgote}
          >
            <Text style={styles.loginButtonText}>Forgot Your Password ?</Text>
          </TouchableOpacity>


          <TouchableOpacity style={styles.loginButton} onPress={handleLogin} >
            <Text style={styles.loginButtonText}>LOGIN</Text>
          </TouchableOpacity>
        </View>


        <Image
          source={ImagePath.ViliyoLogo}
          style={styles.logoImg}
        />

      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: '#2D3037'

  },
  card: {
    width: wp(90),
    backgroundColor: '#2A2A2A80',
    borderRadius: 20,
    padding: 20,
    marginTop: hp(10)
  },
  title: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center'
  },
  loginText: {
    color: 'white',
    fontSize: 22,
    marginBottom: 15,
    textAlign: 'center',
    marginTop: hp(5)
  },
  input: {
    backgroundColor: '#4c4c4c',
    color: 'white',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  radioContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    justifyContent: 'space-around',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCircle: {
    height: 16,
    width: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#888',
    marginRight: 6,
  },
  radioSelected: {
    backgroundColor: 'white',
  },
  radioLabel: {
    color: 'white',
  },
  passwordContainer: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 12,
  },
  loginButton: {
    width: wp(50),
    marginTop: hp(5),
    borderWidth: 1,
    borderColor: '#42cc52',
    borderRadius: 30,
    paddingVertical: 8,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: hp(4)
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  logoImg: {
    width: wp(50),
    height: hp(20),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: hp(15)
  }
})

export default Login