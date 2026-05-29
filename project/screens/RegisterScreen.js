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
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import {
  doc,
  setDoc,
} from 'firebase/firestore';

import {
  auth,
  db,
} from '../../firebaseConfig';

export default function RegisterScreen({
  navigation,
}) {

  const [name, setName] = useState('');

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const handleSignup = async () => {


    if (
      name === '' ||
      email === '' ||
      password === '' ||
      confirmPassword === ''
    ) {

      Alert.alert(
        'Error',
        'Please fill all fields'
      );

      return;
    }

    if (!email.includes('@gmail.com')) {

      Alert.alert(
        'Invalid Email',
        'Enter proper Email'
      );

      return;
    }

    if (password.length < 6) {

      Alert.alert(
        'Weak Password',
        'Password must be at least 6 characters'
      );

      return;
    }

    if (password !== confirmPassword) {

      Alert.alert(
        'Password Error',
        'Passwords do not match'
      );

      return;
    }

    try {

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      const user = userCredential.user;


           Alert.alert(
        'Success',
        'Account Created Successfully',
        [
          {
            text: 'OK',
            onPress: () =>
              navigation.replace('Login'),
          },
        ]
      );


      await setDoc(
        doc(db, 'users', user.uid),
        {
          name: name,
          email: email,
          uid: user.uid,
          createdAt: new Date(),
        }
      );


    } catch (error) {

      Alert.alert(
        'Signup Error',
        'Email is already in Use'
      );


    }
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
          Register
        </Text>

        

        <TextInput
          placeholder="Enter Name"
          placeholderTextColor="#ddd"
          value={name}
          onChangeText={setName}
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
            marginBottom: 15,
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
              color: 'black',
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
            placeholder="Confirm Password"
            placeholderTextColor="#ddd"
            secureTextEntry={
              !showConfirmPassword
            }
            value={confirmPassword}
            onChangeText={
              setConfirmPassword
            }
            style={{
              flex: 1,
              padding: 15,
              color: 'white',
              fontSize: 16,
            }}
          />

          <TouchableOpacity
            onPress={() =>
              setShowConfirmPassword(
                !showConfirmPassword
              )
            }
          >

            <Ionicons
              name={
                showConfirmPassword
                  ? 'eye'
                  : 'eye-off'
              }
              size={24}
              color="white"
            />

          </TouchableOpacity>

        </View>

        

        <TouchableOpacity
          onPress={handleSignup}
          style={{
            width: 300,
            backgroundColor: '#0984e3',
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
            Create Account
          </Text>

        </TouchableOpacity>

        

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Login')
          }
        >

          <Text
            style={{
              color: 'white',
              fontSize: 15,
            }}
          >
            Already have an account? Login
          </Text>

        </TouchableOpacity>

      </View>

    </ImageBackground>
  );
}