import {
  StyleSheet,
  Text,
  TouchableHighlight,
  FlatList,
  View,
} from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

export default function History({navigation}) {
  const [IDBankNotes, setIDBankNotes] = '';
  const [datahistory, setdatahistory] = {};

  React.useEffect(() => {
    const uid = auth.user.uid;
    database()
      .ref(`users/${uid}`)
      .once('value', snapshot => {
        const fetchGauge = snapshot.val();
        setIDBankNotes(fetchGauge.IDBankNotes);
        console.log('ID Bank Notes: ', fetchGauge);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    database()
      .ref(`BankNotes/${IDBankNotes}`)
      .once('value', snapshot => {
        const fetchGauge = snapshot.val();
        setdatahistory(fetchGauge);
        console.log('Data History: ', fetchGauge);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const Item = ({title}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  return (
    <View style={styles.Container}>
      <TouchableHighlight
        style={styles.Bars}
        onPress={() => navigation.openDrawer()}>
        <FontAwesome5 name={'bars'} size={30} color="black" />
      </TouchableHighlight>
      <Text style={styles.Text1}>History</Text>
      <Text style={styles.Text2}>Tabungan</Text>
      <Text style={styles.Text3}>Please save your money!</Text>
      <View style={styles.Tabungan}>
        <FlatList
          data={datahistory}
          renderItem={Item}
          keyExtractor={item => item.tanggal}
        />
      </View>
      <View style={styles.Total}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#A0A0A0',
  },
  Bars: {
    height: 40,
    width: 40,
    marginTop: 20,
    marginLeft: 20,
    backgroundColor: 'white',
    paddingLeft: 7,
    paddingTop: 4,
    borderRadius: 10,
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
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
