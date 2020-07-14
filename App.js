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
import {userCache} from './src/helpers/cacheHelper';

import ErrorBoundary from './src/components/ErrorBoundary';
import HomeScreen from './src/screens/HomeScreen';
import NotificationScreen from './src/screens/NotificationScreen';

import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import SettingScreen from './src/screens/SettingScreen';
import QuestionaireScreen from './src/screens/Questionaire';

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

  isUserLoggedIn = async () => {
    {
      const usersRef = firebase.firestore().collection('users');
      firebase.auth().onAuthStateChanged((user) => {
        if (user != null) {
          usersRef
            .doc(user.uid)
            .get()
            .then((document) => {
              const userData = document.data();
              //console.log(userData);
              setLoading(false);
              setUser(userData);
            })
            .catch((error) => {
              setLoading(false);
            });
        } else {
          setLoading(false);
          setUser(null);
        }
      });
    }
  };

  useEffect(() => {
    isUserLoggedIn();
  }, []);

  return (
    <ErrorBoundary>
      <NavigationContainer>
        {user ? (
          <HomeStackNavigator />
        ) : (
          <Stack.Navigator>
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
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </ErrorBoundary>
  );
}

const HomeStackNavigator = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      //options={{headerShown: false}}
      name="Home Navigator"
      component={HomeTabNavigator}
    />
    <Stack.Screen name="Setting Screen" component={SettingScreen} />
    <Stack.Screen name="Questionaire Screen" component={QuestionaireScreen} />
  </Stack.Navigator>
);

const HomeTabNavigator = ({route}) => (
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
            <HomeStackNavigator  />
*/
}
