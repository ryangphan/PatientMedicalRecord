import 'react-native-gesture-handler';
import React, {useReducer, useState, useEffect} from 'react';

import loadingReducer from './src/redux/reducers/LoadingReducer';
import {firebase} from './config/config';
import colors from './src/assets/colors';
import {userCache} from './src/helpers/cacheHelper';
import {normalize} from './src/helpers/FontHelper';

import ErrorBoundary from './src/components/ErrorBoundary';
import HomeScreen from './src/screens/HomeScreen';
import NotificationScreen from './src/screens/NotificationScreen';
import SettingScreen from './src/screens/SettingScreen';
import QuestionaireScreen from './src/screens/QuestionaireScreen';

import LoadingScreen from './src/screens/LoadingScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import InquiryScreen from './src/screens/InquiryScreen';

import {NavigationContainer} from '@react-navigation/native';
import * as RootNavigation from './src/helpers/RootNavigation';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import SplashScreen from 'react-native-splash-screen';
import messaging from '@react-native-firebase/messaging'

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [loading, loadingDispatch] = useReducer(loadingReducer, true);
  const [user, setUser] = useState(null);

  isUserLoggedIn = async () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        loadingDispatch({type: 'START'});
        setUser(user);
      } else {
        // trash logic starts here -_- but it works perfect
        setUser(null);
        RootNavigation.navigate('WelcomeScreen');
        loadingDispatch({type: 'STOP'});
      }
    });
  };

  useEffect(() => {
    isUserLoggedIn();
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer ref={RootNavigation.navigationRef}>
      {user ? (
        <HomeStackNavigator />
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="LoadingScreen"
            component={LoadingScreen}
            options={{
              headerBackTitleVisible: false,
              headerTransparent: true,
              headerTitle: '',
            }}
          />
          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{
              headerShown: false,
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
    // </Provider>
  );
}

const HomeStackNavigator = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      options={{headerShown: false}}
      name="Dash Board"
      component={HomeTabNavigator}
    />
    <Stack.Screen
      name="Inquiry Screen"
      component={InquiryScreen}
      // options={{
      //   headerShown: false,
      // }}
    />
    <Stack.Screen
      name="Setting Screen"
      component={SettingScreen}
      // options={{
      //   headerShown: false,
      // }}
    />
    <Stack.Screen name="Questionaire Screen" component={QuestionaireScreen} />
  </Stack.Navigator>
);

const HomeTabNavigator = ({route}) => (
  <Tab.Navigator
    tabBarOptions={{
      style: {
        backgroundColor: colors.primaryColor,
        //paddingBottom: normalize(20),
      },
      activeTintColor: colors.logoColor,
      inactiveTintColor: colors.bgTextInput,
      labelStyle: {
        fontSize: normalize(25),
      },
      tabStyle: {
        borderColor: 'gray',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    }}>
    <Tab.Screen
      options={{tabBarLabel: 'Home'}}
      name="Home Screen"
      component={HomeScreen}
    />
    <Tab.Screen
      options={{tabBarLabel: 'Notification'}}
      name="Notification Screen"
      component={NotificationScreen}
    />
  </Tab.Navigator>
);

// const mapStateToProps = state => {
// 	return {
// 		auth: state.auth,
// 	}
// }

// const mapDispatchToProps = dispatch => {
// 	return {
// 		signIn: user => dispatch({ type: 'SIGN_IN', payload: user }),
// 		signOut: () => dispatch({ type: 'SIGN_OUT' }),
// 	}
// }

// export default connect(mapStateToProps, mapDispatchToProps)(App)

{
  /*
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
*/
}
