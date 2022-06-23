import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import React from 'react';

export default function History(navigation) {
  return (
    <View style={styles.Container}>
      <Text style={styles.Text1}>History</Text>
      <Text style={styles.Text2}>Tabungan</Text>
      <Text style={styles.Text3}>Please save your money!</Text>
      <View style={styles.Tabungan}></View>
      <View style={styles.Total}></View>
      <TouchableHighlight
        style={styles.Back}
        onPress={() => navigation.navigate('Dasboard')}>
        <Text style={styles.Text4}>Back</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#A0A0A0',
  },
  shadow: {
    width: 320,
    height: 50,
    width: '90%',
    height: '10%',
    borderRadius: 100,
    marginTop: -30,
    paddingTop: 10,
    marginLeft: 22,
    shadowColor: '#000000',
    shadowOffset: {height: 4, width: 0},
    shadowOpacity: 1,
    elevation: 15,
  },
  Text1: {
    marginTop: 30,
    fontFamily: 'Poppins-Bold',
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
  },
  Text2: {
    fontFamily: 'Poppins-Bold',
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
  Text4: {
    fontFamily: 'Poppins-Medium',
    fontSize: 25,
    color: 'black',
    marginTop: 5,
    alignSelf: 'center',
  },
  Tabungan: {
    height: 400,
    width: 300,
    marginTop: 30,
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  Total: {
    height: 50,
    width: 300,
    marginTop: 5,
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  Back: {
    height: 40,
    width: 80,
    marginTop: 45,
    marginLeft: 20,
    borderRadius: 15,
    backgroundColor: 'white',
  },
});
