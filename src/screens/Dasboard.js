import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import React, {useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Calendar} from 'react-native-calendars';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

export default function Dasboard({navigation}) {
  const [dataKalender, setDataKalender] = useState({});

  React.useEffect(() => {
    const fetchHistory = async () => {
      // Ambil UID dari user
      const uid = auth().currentUser.uid;

      try {
        // Ambil ID Bank Note berdasarkan UID user
        const fetchIdBankNote = await database()
          .ref(`users/${uid}`)
          .once('value');

        // Setelah ID Bank Note diambil, baca data history berdasarkan ID Bank Note tersebut
        if (fetchIdBankNote.val().IDBankNotes) {
          const IDBankNotes = fetchIdBankNote.val().IDBankNotes;
          const fetchHistoryData = await database()
            .ref(`BankNotes/${IDBankNotes}`)
            .once('value');

          const warnaKalender = {};
          for (const itemHistory in fetchHistoryData.val()) {
            warnaKalender[`${itemHistory.tanggal}`] = {
              color: fetchHistoryData.val()[itemHistory].warna, // itemHistory.warna,
              startingDay: true,
              endingDay: true,
              textColor: 'black',
            };
          }

          console.log('Warna Kalender: ', warnaKalender);
          setDataKalender(warnaKalender);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchHistory();
  }, []);

  return (
    <View style={styles.Container}>
      <TouchableHighlight
        style={styles.Bars}
        onPress={() => navigation.openDrawer()}>
        <FontAwesome5 name={'bars'} size={30} color="black" />
      </TouchableHighlight>
      <Text style={styles.Text1}>Smart</Text>
      <Text style={styles.Text2}>Banknotes</Text>
      <Text style={styles.Text3}>Please save your money!</Text>
      <View style={styles.Balance}>
        <View style={styles.Total}>
          <Text style={styles.Text4}>Your Balance Now</Text>
        </View>
        <View style={styles.Total}>
          <Text style={styles.Text4}>RP 1.000.000</Text>
        </View>
      </View>
      <View style={styles.Kalender}>
        <Calendar
          // current={'2022-06-20'}
          // minDate={'2012-06-10'}
          markingType={'period'}
          theme={{
            calendarBackground: '#333248',
            textSectionTitleColor: 'white',
            textSectionTitleDisabledColor: 'gray',
            dayTextColor: 'white',
            todayTextColor: 'gray',
            selectedDayTextColor: 'white',
            monthTextColor: 'white',
            indicatorColor: 'white',
            selectedDayBackgroundColor: '#333248',
            arrowColor: 'white',
            // textDisabledColor: 'red',
            stylesheet: {
              calendar: {
                header: {
                  week: {
                    marginTop: 30,
                    marginHorizontal: 12,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  },
                },
              },
            },
          }}
          markedDates={dataKalender}
        />
      </View>
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
    marginTop: 20,
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
    marginTop: 20,
    marginLeft: 10,
  },
  Balance: {
    height: 150,
    width: 300,
    marginTop: 20,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 20,
  },
  Total: {
    height: 70,
    width: 290,
    alignSelf: 'center',
    marginTop: 3,
  },
  Kalender: {
    height: 300,
    width: 300,
    marginTop: 30,
    backgroundColor: 'white',
    alignSelf: 'center',
  },
});
