import React, { useState } from 'react';

import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

import {
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { auth } from '../../firebaseConfig';

export default function LoginScreen({
  navigation,
}) {

  const [email, setEmail] = useState('');

  const [password, setPassword] =
    useState('');

  const [showPassword, setShowPassword] =
    useState(false);

  const handleLogin = () => {

    if (email === '' || password === '') {

      Alert.alert(
        'Error',
        'Please fill all fields'
      );

      return;
    }

    signInWithEmailAndPassword(
      auth,
      email,
      password
    )
      .then(() => {

        Alert.alert(
          'Success',
          `Welcome ${email}`
        );
      })

      .catch(() => {

        Alert.alert(
          'Login Error',
          'Invalid email or password'
        );
      });
  };

  return (

    <ImageBackground
      source={require('../../assets/login.webp')}
      resizeMode="cover"
      style={{ flex: 1 }}
    >

      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}
      >

        <Text
          style={{
            fontSize: 34,
            fontWeight: 'bold',
            marginBottom: 40,
            color: 'white',
          }}
        >
          Login
        </Text>

        

        <TextInput
          placeholder="Enter Email"
          placeholderTextColor="#ddd"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) =>
            setEmail(text.toLowerCase())
          }
          style={{
            width: 300,
            backgroundColor:
              'rgba(255,255,255,0.2)',
            padding: 15,
            borderRadius: 12,
            marginBottom: 15,
            color: 'white',
            borderWidth: 1,
            borderColor: '#fff',
            fontSize: 16,
          }}
        />

        

        <View
          style={{
            width: 300,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor:
              'rgba(255,255,255,0.2)',
            borderRadius: 12,
            marginBottom: 25,
            borderWidth: 1,
            borderColor: '#fff',
            paddingHorizontal: 10,
          }}
        >

          <TextInput
            placeholder="Enter Password"
            placeholderTextColor="#ddd"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            style={{
              flex: 1,
              padding: 15,
              color: 'white',
              fontSize: 16,
            }}
          />

          <TouchableOpacity
            onPress={() =>
              setShowPassword(
                !showPassword
              )
            }
          >

            <Ionicons
              name={
                showPassword
                  ? 'eye'
                  : 'eye-off'
              }
              size={24}
              color="white"
            />

          </TouchableOpacity>

        </View>

        

        <TouchableOpacity
          onPress={handleLogin}
          style={{
            width: 300,
            backgroundColor: '#00b894',
            padding: 15,
            borderRadius: 12,
            marginBottom: 15,
          }}
        >

          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 16,
            }}
          >
            Login
          </Text>

        </TouchableOpacity>

        

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Register')
          }
        >

          <Text
            style={{
              color: 'white',
              fontSize: 15,
            }}
          >
            Don't have an account? Register
          </Text>

        </TouchableOpacity>

      </View>

    </ImageBackground>
  );
}