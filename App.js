import 'react-native-gesture-handler';
import React, {Component, useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {firebase} from './config/config';
import colors from './src/assets/colors';

import ErrorBoundary from './src/components/ErrorBoundary';
import HomeScreen from './src/screens/HomeScreen';
import NotificationScreen from './src/screens/NotificationScreen';

import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            console.log(userData);
            setLoading(false);
            setUser(userData);
          })
          .catch((error) => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return <></>;
  }
  return (
    <ErrorBoundary>
      <NavigationContainer>
        <Stack.Navigator>
          {user ? (
            <Stack.Screen name="Home">
              {(props) => <HomeStackNavigator {...props} extraData={user} />}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen
                name="WelcomeScreen"
                component={WelcomeScreen}
                options={{
                  headerBackTitleVisible: false,
                  headerTransparent: true,
                  headerTitle: '',
                }}
              />
              <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{
                  headerBackTitleVisible: false,
                  headerTransparent: true,
                  headerTitle: '',
                }}
              />
              <Stack.Screen
                name="SignUpScreen"
                component={SignUpScreen}
                options={{
                  headerBackTitleVisible: false,
                  headerTransparent: true,
                  headerTitle: '',
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ErrorBoundary>
  );
}

const HomeStackNavigator = ({navigation, extraData}) => (
  <Stack.Navigator>
    <Stack.Screen
      options={{headerShown: false}}
      name="Home Navigator"
      component={HomeTabNavigator}
    />
  </Stack.Navigator>
);

const HomeTabNavigator = ({route, extraData}) => (
  <Tab.Navigator
    tabBarOptions={{
      style: {
        backgroundColor: colors.bgMain,
      },
      activeTintColor: colors.logoColor,
      inactiveTintColor: colors.bgTextInput,
    }}>
    <Tab.Screen name="Home Screen" component={HomeScreen} />
    <Tab.Screen name="Notification Screen" component={NotificationScreen} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

{
  /*
<Stack.Screen name="Home">
              {(props) => <HomeStackNavigator {...props} extraData={user} />}
            </Stack.Screen>
*/
}
