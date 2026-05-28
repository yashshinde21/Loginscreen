import React, { useState } from 'react';

import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground
} from 'react-native';

import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import app from './firebaseConfig';

const auth = getAuth(app);

export default function App() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // SIGNUP
  const handleSignup = () => {

    if (email === '' || password === '') {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        Alert.alert('Success', 'Account Created');
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
      .catch((error) => {
        Alert.alert('Login Error', error.message);
      });
  };

  return (
      <ImageBackground
  source={require('./assets/bg.jpg')}
  resizeMode="cover"
  style={{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  }}
>

      <Text
        style={{
          fontSize: 28,
          fontWeight: 'bold',
          marginBottom: 30,
        }}
      >
        Login Screen
      </Text>

      <TextInput
        placeholder="Enter Email"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
        style={{
          width: 280,
          backgroundColor: 'white',
          padding: 12,
          borderRadius: 10,
          marginBottom: 15,
          borderWidth: 1,
        }}
      />

      <TextInput
        placeholder="Enter Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
        style={{
          width: 280,
          backgroundColor: 'white',
          padding: 12,
          borderRadius: 10,
          marginBottom: 20,
          borderWidth: 1,
        }}
      />

      {/* LOGIN BUTTON */}
      <TouchableOpacity
        onPress={handleLogin}
        style={{
          width: 280,
          backgroundColor: '#4CAF50',
          padding: 14,
          borderRadius: 10,
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          Login
        </Text>
      </TouchableOpacity>

      {/* SIGNUP BUTTON */}
      <TouchableOpacity
        onPress={handleSignup}
        style={{
          width: 280,
          backgroundColor: '#2196F3',
          padding: 14,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          Create Account
        </Text>
      </TouchableOpacity>
</ImageBackground>
  );
}