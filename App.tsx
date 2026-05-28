import React, { useState } from 'react';

import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { auth } from './firebaseConfig';

export default function App() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // EMAIL VALIDATION
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // SIGNUP
  const handleSignup = () => {

    if (email === '' || password === '') {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Enter proper email');
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        'Weak Password',
        'Password must be at least 6 characters'
      );
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        Alert.alert('Success', 'Account Created');
        setEmail('');
        setPassword('');
      })
      .catch((error) => {
        Alert.alert('Signup Error', error.message);
      });
  };

  // LOGIN
  const handleLogin = () => {

    if (email === '' || password === '') {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        Alert.alert('Success', `Welcome ${email}`);
      })
      .catch(() => {
        Alert.alert('Login Error', 'Invalid email or password');
      });
  };

  return (

    <ImageBackground
      source={require('./assets/login.webp')}
      resizeMode="cover"
      style={{
        flex: 1,
      }}
    >

      {/* DARK OVERLAY */}

      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}
      >

        {/* TITLE */}

        <Text
          style={{
            fontSize: 34,
            fontWeight: 'bold',
            marginBottom: 40,
            color: 'white',
          }}
        >
          Firebase Login
        </Text>

        {/* EMAIL */}

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
            backgroundColor: 'rgba(255,255,255,0.2)',
            padding: 15,
            borderRadius: 12,
            marginBottom: 15,
            color: 'white',
            borderWidth: 1,
            borderColor: '#fff',
            fontSize: 16,
          }}
        />

        {/* PASSWORD */}

        <TextInput
          placeholder="Enter Password"
          placeholderTextColor="#ddd"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          style={{
            width: 300,
            backgroundColor: 'rgba(255,255,255,0.2)',
            padding: 15,
            borderRadius: 12,
            marginBottom: 25,
            color: 'white',
            borderWidth: 1,
            borderColor: '#fff',
            fontSize: 16,
          }}
        />

        {/* LOGIN BUTTON */}

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

        {/* SIGNUP BUTTON */}

        <TouchableOpacity
          onPress={handleSignup}
          style={{
            width: 300,
            backgroundColor: '#0984e3',
            padding: 15,
            borderRadius: 12,
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
            Create Account
          </Text>
        </TouchableOpacity>

      </View>

    </ImageBackground>
  );
}