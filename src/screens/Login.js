import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import auth from '@react-native-firebase/auth';

export default function Login({navigation}) {
  const [Username, OnChangeEmail] = useState('Email');
  const [Password, OnchangePassword] = useState('Password');

  const SubmitLogin = () => {
    auth()
      .signInWithEmailAndPassword(Username, Password.trim())
      .then(() => {
        console.log('User logged in!');
      })
      .catch(err => {
        if (err.code === 'auth/invalid-email') {
          Alert.alert('Login Error', 'Email invalid');
        } else if (err.code === 'auth/user-disabled') {
          Alert.alert('Login Error', 'User disabled');
        } else if (err.code === 'auth/user-not-found') {
          Alert.alert(
            'Login Error',
            'User tidak ditemukan. Silahkan register terlebih dahulu.',
          );
        } else if (err.code === 'auth/wrong-password') {
          Alert.alert('Login Error', 'Password salah');
        }
      });
  };

  return (
    <View style={styles.Container}>
      <Text style={styles.Text1}>Smart</Text>
      <Text style={styles.Text2}>Banknotes</Text>
      <Text style={styles.Text3}>Please save your money!</Text>
      <TextInput
        style={styles.Username}
        placeholder="Email"
        placeholderTextColor="black"
        onChangeText={text => OnChangeEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.password}
        placeholder="Password"
        placeholderTextColor="black"
        onChangeText={text => OnchangePassword(text)}
        secureTextEntry={true}
      />
      <TouchableHighlight style={styles.login} onPress={SubmitLogin}>
        <Text style={styles.Text3}>Sign In</Text>
      </TouchableHighlight>
      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
        <Text style={styles.Register}>Don't have an account?</Text>
        <TouchableHighlight
          style={styles.Tombol1}
          onPress={() => navigation.navigate('Register')}>
          <Text style={[styles.Register, {color: '#FF0000'}]}> Sign Up</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#A0A0A0',
  },
  Text1: {
    marginTop: 100,
    fontFamily: 'Poppins-Bold',
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
  },
  Text2: {
    fontFamily: 'Poppins-Medium',
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
  },
  Text3: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
  },
  Username: {
    color: 'black',
    backgroundColor: 'white',
    height: 50,
    width: 300,
    alignSelf: 'center',
    marginTop: 150,
    borderRadius: 50,
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
    paddingLeft: 20,
    paddingBottom: 10,
  },
  password: {
    color: 'black',
    backgroundColor: 'white',
    height: 50,
    width: 300,
    alignSelf: 'center',
    marginTop: 5,
    borderRadius: 50,
    borderRadius: 50,
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
    paddingLeft: 20,
    paddingBottom: 13,
  },
  login: {
    backgroundColor: 'white',
    height: 50,
    width: 100,
    alignSelf: 'center',
    marginTop: 50,
    borderRadius: 20,
    justifyContent: 'center',
  },
  Register: {
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
  },
  Tombol1: {
    width: 50,
    height: 20,
    backgroundColor: '#A0A0A0',
    marginTop: -1,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
});
