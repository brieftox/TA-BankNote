import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import 'react-native-gesture-handler';

import {Login} from '../screens/Login';
import {Register} from '../screens/Register';
import {Dasboard} from '../screens/Dasboard';
import {History} from '../screens/History';
import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();
const LoginStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function LoginScreen() {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <LoginStack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
    </LoginStack.Navigator>
  );
}

/*function HomeScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Dasboard"
        component={Dasboard}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="History"
        component={History}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
}*/

export default function Navigation() {
  const [signedIn, setSignedIn] = useState(false);

  auth().onAuthStateChanged(loggedIn => {
    if (loggedIn) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  });

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {signedIn ? (
          // <Stack.Screen>
          /* <Drawer.Navigator initialRouteName="Dasboard"> */
          <Stack.Screen name="Dasboard" component={Dasboard} />
        ) : (
          // <Drawer.Screen
          // name="History"
          // component={History}
          /*options={{headerShown: false}}*/
          // />
          // </Drawer.Navigator>
          // </Stack.Screen>
          <Stack.Screen
            name="LoginNavigation"
            component={LoginScreen}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
