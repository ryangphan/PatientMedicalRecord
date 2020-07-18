import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ImageBackground,
  Switch,
} from 'react-native';

import colors from '../assets/colors';

import {firebase} from '../../config/config';
import {normalize} from '../helpers/FontHelper';
import Icon from 'react-native-ionicons';
import HomeScreen from './HomeScreen';

class SettingScreen extends Component {
  constructor() {
    super();
    this.state = {
      isPushNotifications: false,
      isSMS: false,
      isEmail: false,
      isReceiveOffers: false,
    };
  }

  onLogoutPress = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      alert('Unable to sign out right now');
      console.log(error);
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView />
        <View>
          <ImageBackground
            source={require('../assets/header.png')}
            style={styles.imageBackground}
            resizeMode="stretch">
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Home Screen')}>
              <Icon name="ios-menu" size={normalize(30)} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>SETTINGS</Text>
          </ImageBackground>
        </View>

        {/* ------------------------------- */}

        <SafeAreaView />
      </View>
    );
  }
}

export default SettingScreen;

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageBackground: {
    width: screenWidth * 0.45,
    height: normalize(43),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: normalize(17),
  },
  bodyContent: {
    flex: 0.42,
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: normalize(10),
    marginVertical: normalize(5),
  },
  content2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: normalize(10),
    marginVertical: normalize(10),
  },
  contentTitle: {
    fontSize: normalize(14),
    fontWeight: 'bold',
  },
  button: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5,
    backgroundColor: '#f8fdf5',
    borderRadius: 5,
    margin: normalize(15),
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
