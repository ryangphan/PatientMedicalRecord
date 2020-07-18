import React, {Component, useState, useEffect, useReducer} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  LogBox,
} from 'react-native';

import _ from 'lodash';
import loadingReducer from '../redux/reducers/LoadingReducer';
import {userCache} from '../helpers/cacheHelper';
import {normalize} from '../helpers/FontHelper';
import {firebase} from '../../config/config';
import firestore from '@react-native-firebase/firestore';
import colors from '../assets/colors';
import Icon from 'react-native-ionicons';
import LoadingScreen from './LoadingScreen';

export default function HomeScreen({navigation}) {
  const [user, setUser] = useState({});
  const [loading, loadingDispatch] = useReducer(loadingReducer);

  const onLogoutPress = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      alert('Unable to sign out right now');
      console.log(error);
    }
  };

  useEffect(() => {
    const _console = _.clone(console);
    LogBox.ignoreLogs([
      "Warning: Can't perform a React state update on an unmounted component.",
    ]);
    console.warn = (message) => {
      if (
        message.indexOf(
          "Warning: Can't perform a React state update on an unmounted component.",
        ) <= -1
      ) {
        _console.warn(message);
      }
    };

    loadingDispatch({type: 'STOP'});
    let userID = firebase.auth().currentUser.uid;
    firestore()
      .collection('users')
      .doc(userID)
      .get()
      .then((firestoreDocument) => {
        const data = firestoreDocument.data();
        setUser(data);
      });
  }, []);

  const onTempPress = () => {};
  const onUserProfilePress = () => {};
  const onSettingPress = () => {
    navigation.navigate('Setting Screen');
  };
  const onQuestionairePress = () => {
    navigation.navigate('Questionaire Screen');
  };

  if (loading) return <LoadingScreen />;

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={styles.header}>
        <View style={{flex: 0.7, flexDirection: 'row'}}>
          <View style={styles.imageContainer}>
            <TouchableOpacity
              disabled={false}
              style={{flex: 1}}
              onPress={() => onUserProfilePress()}>
              {user.imageUri ? (
                <Image
                  source={{uri: user.imageUri}}
                  style={styles.image}
                  // indicator={ProgressPie}
                  indicatorProps={{
                    size: 40,
                    borderWidth: 0,
                    color: colors.logoColor,
                    unfilledColor: 'rgba(200,200,200,0.2)',
                  }}
                  imageStyle={{borderRadius: 35}}
                />
              ) : (
                <Image
                  source={require('../assets/person-icon.png')}
                  style={styles.image}
                />
              )}
            </TouchableOpacity>
          </View>
          <View style={{flex: 0.6}}>
            <Text style={styles.textInput}>Full Name: {user.fullName}</Text>
            <Text style={styles.textInput}>Email: {user.email} </Text>
          </View>
        </View>
        <View style={{flex: 0.3, alignContent: 'center'}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onLogoutPress()}>
            <Text style={styles.buttonTitle}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 0.7}}>
        <View style={{flex: 0.5, flexDirection: 'row'}}>
          <View style={styles.dashBoard}>
            <TouchableOpacity
              style={styles.buttonDB}
              onPress={() => onTempPress()}>
              <Icon
                name="airplane"
                color="white"
                size={normalize(50)}
                style={{marginBottom: normalize(25)}}
              />
              <Text style={styles.buttonTitle}>Inquiry Form</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dashBoard}>
            <TouchableOpacity
              style={styles.buttonDB}
              onPress={() => onQuestionairePress()}>
              <Icon
                name="ios-home"
                color="white"
                size={normalize(50)}
                style={{marginBottom: normalize(25)}}
              />
              <Text style={styles.buttonTitle}>Questionaire</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 0.5, flexDirection: 'row'}}>
          <View style={styles.dashBoard}>
            <TouchableOpacity
              style={styles.buttonDB}
              onPress={() => onSettingPress()}>
              <Icon
                name="ios-settings"
                color="white"
                size={normalize(50)}
                style={{marginBottom: normalize(25)}}
              />
              <Text style={styles.buttonTitle}>Setting</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dashBoard}>
            <TouchableOpacity
              style={styles.buttonDB}
              onPress={() => onTempPress()}>
              <Text style={styles.buttonTitle}>Secret Button</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <SafeAreaView />
    </View>
  );
}

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
const height_image = screenHeight * 0.5 * 0.5 * 0.5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
  },
  header: {
    //height: 60,
    flex: 0.3,
    borderBottomWidth: 0.5,
    backgroundColor: colors.borderColor,
    borderBottomColor: 'black',
    //alignItems: 'center',
    //justifyContent: 'center',
    //flexDirection: 'row',
  },
  logo: {
    flex: 1,
    height: 50,
    width: 50,
    alignSelf: 'center',
    margin: 30,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },
  dashBoard: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDB: {
    height: screenHeight * 0.5 * 0.5 * 0.85,
    width: screenWidth * 0.5 * 0.9,
    backgroundColor: '#788eec',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#788eec',
    marginLeft: 30,
    marginRight: 30,
    marginTop: normalize(10),
    height: normalize(48),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerView: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: '#2e2e2d',
  },
  footerLink: {
    color: '#788eec',
    fontWeight: 'bold',
    fontSize: 16,
  },
  imageContainer: {
    flex: 0.4,
    height: height_image,
    alignSelf: 'center',
    marginVertical: normalize(40),
  },
  image: {
    width: '80%',
    height: '100%',
    borderWidth: 5,
    borderColor: 'grey',
    borderRadius: 30,
    marginLeft: normalize(10),
  },
  textInput: {
    flex: 1,
    backgroundColor: 'transparent',

    width: '100%',

    fontSize: normalize(30),
    fontWeight: '200',
    color: 'black',
    padding: normalize(10),
    marginHorizontal: normalize(10),
    marginVertical: normalize(15),
  },
});
//rnpce
