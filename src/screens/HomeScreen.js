import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';

import {userCache} from '../helpers/cacheHelper';
import {normalize} from '../helpers/FontHelper';
import {firebase} from '../../config/config';
import colors from '../assets/colors';
import Icon from 'react-native-ionicons';

export default function HomeScreen({navigation}) {
  componentDidMount = async () => {
    let user = await userCache.get('userInfo');
    //console.log(user);
  };

  onLogoutPress = async () => {
    try {
      await firebase.auth().signOut();
      await userCache.clearAll();
      await userCache.remove('userInfo');
    } catch (error) {
      alert('Unable to sign out right now');
      console.log(error);
    }
  };

  onTempPress = () => {};
  onSettingPress = () => {
    navigation.navigate('Setting Screen');
  };
  onQuestionairePress = () => {
    navigation.navigate('Questionaire Screen');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={styles.header}>
        <View style={{flex: 0.7}}></View>
        <View style={{flex: 0.3}}>
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
              <Text style={styles.buttonTitle}>Inquiry Form</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dashBoard}>
            <TouchableOpacity
              style={styles.buttonDB}
              onPress={() => onQuestionairePress()}>
              <Text style={styles.buttonTitle}>Questionaire</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 0.5, flexDirection: 'row'}}>
          <View style={styles.dashBoard}>
            <TouchableOpacity
              style={styles.buttonDB}
              onPress={() => onSettingPress()}>
              <Text style={styles.buttonTitle}>Setting</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dashBoard}>
            <TouchableOpacity
              style={styles.buttonDB}
              onPress={() => onTempPress()}>
              <Text style={styles.buttonTitle}>Log Out</Text>
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
  },
  button: {
    backgroundColor: '#788eec',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
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
});
//rnpce
