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

        <View
          style={{
            flex: 1,
            paddingHorizontal: normalize(15),
            paddingTop: normalize(10),
          }}>
          <Text style={{color: '#696969', fontSize: normalize(15)}}>
            Notifications
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#A9A9A9',
              marginEnd: screenWidth * 0.3,
              marginTop: normalize(4),
            }}
          />
          {/* ....................... */}
          <View style={styles.content}>
            <View style={{alignContent: 'flex-start'}}>
              <Text style={styles.contentTitle}>Push Notifications</Text>
              <Text style={{fontSize: normalize(9.3), color: 'silver'}}>
                Receive incoming messages and bookings
              </Text>
            </View>
            <Switch
              style={{alignItems: 'flex-end'}}
              trackColor={{false: '#767577', true: '#41bf36'}}
              thumbColor={'#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => {
                this.setState({
                  isPushNotifications: !this.state.isPushNotifications,
                });
              }}
              value={this.state.isPushNotifications}
            />
          </View>
          <View style={styles.content}>
            <View style={{alignContent: 'flex-start'}}>
              <Text style={styles.contentTitle}>SMS</Text>
              <Text style={{fontSize: normalize(9.3), color: 'silver'}}>
                Notifications via SMS
              </Text>
            </View>
            <Switch
              style={{alignItems: 'flex-end'}}
              trackColor={{false: '#767577', true: '#41bf36'}}
              thumbColor={'#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => {
                this.setState({
                  isSMS: !this.state.isSMS,
                });
              }}
              value={this.state.isSMS}
            />
          </View>
          <View style={styles.content}>
            <View style={{alignContent: 'flex-start'}}>
              <Text style={styles.contentTitle}>Email</Text>
              <Text style={{fontSize: normalize(9.3), color: 'silver'}}>
                We will send all booking information via email
              </Text>
            </View>
            <Switch
              style={{alignItems: 'flex-end'}}
              trackColor={{false: '#767577', true: '#41bf36'}}
              thumbColor={'#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => {
                this.setState({
                  isEmail: !this.state.isEmail,
                });
              }}
              value={this.state.isEmail}
            />
          </View>
          <View style={styles.content}>
            <View style={{alignContent: 'flex-start'}}>
              <Text style={styles.contentTitle}>Receive Offers</Text>
              <Text style={{fontSize: normalize(9.3), color: 'silver'}}>
                You will receive offers from us via email
              </Text>
            </View>
            <Switch
              style={{alignItems: 'flex-end'}}
              trackColor={{false: '#767577', true: '#41bf36'}}
              thumbColor={'#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => {
                this.setState({
                  isReceiveOffers: !this.state.isReceiveOffers,
                });
              }}
              value={this.state.isReceiveOffers}
            />
          </View>

          {/* ------------------------------- */}
          <View style={{flex: 0.3, justifyContent: 'center'}}>
            <Text style={{color: '#696969', fontSize: normalize(15)}}>
              Support
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#A9A9A9',
                marginEnd: screenWidth * 0.3,
                marginTop: normalize(4),
              }}
            />
            {/* ....................... */}
            <View style={styles.content2}>
              <View style={{alignContent: 'flex-start'}}>
                <Text style={styles.contentTitle}>Help Hub</Text>
              </View>
              <TouchableOpacity style={{marginEnd: normalize(15)}}>
                <Icon name="bug" size={normalize(20)} />
              </TouchableOpacity>
            </View>
            <View style={styles.content2}>
              <View style={{alignContent: 'flex-start'}}>
                <Text style={styles.contentTitle}>Report a Problem</Text>
              </View>
              <TouchableOpacity style={{marginEnd: normalize(15)}}>
                <Icon name="bug" size={normalize(20)} />
              </TouchableOpacity>
            </View>
            <View style={styles.content2}>
              <View style={{alignContent: 'flex-start'}}>
                <Text style={styles.contentTitle}>Give Us Feedback</Text>
              </View>
              <TouchableOpacity style={{marginEnd: normalize(15)}}>
                <Icon name="bug" size={normalize(20)} />
              </TouchableOpacity>
            </View>
          </View>
          {/* ------------------------------- */}
          <View style={styles.bodyContent}>
            <Text style={{color: '#696969', fontSize: normalize(15)}}>
              Legal and Regulations
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#A9A9A9',
                marginEnd: screenWidth * 0.3,
                marginTop: normalize(4),
              }}
            />
            {/* ....................... */}
            <View style={styles.content2}>
              <View style={{alignContent: 'flex-start'}}>
                <Text style={styles.contentTitle}>Terms of Use</Text>
              </View>
              <TouchableOpacity style={{marginEnd: normalize(15)}}>
                <Icon name="chevron-right" size={normalize(20)} />
              </TouchableOpacity>
            </View>
            <View style={styles.content2}>
              <View style={{alignContent: 'flex-start'}}>
                <Text style={styles.contentTitle}>Privacy policy</Text>
              </View>
              <TouchableOpacity style={{marginEnd: normalize(15)}}>
                <Icon name="eye-slash" size={normalize(20)} />
              </TouchableOpacity>
            </View>
            <View style={styles.content2}>
              <View style={{alignContent: 'flex-start'}}>
                <Text style={styles.contentTitle}>Payment Policy</Text>
              </View>
              <TouchableOpacity style={{marginEnd: normalize(15)}}>
                <Icon name="chevron-right" size={normalize(20)} />
              </TouchableOpacity>
            </View>
            <View style={styles.content2}>
              <View style={{alignContent: 'flex-start'}}>
                <Text style={styles.contentTitle}>About</Text>
              </View>
              <TouchableOpacity style={{marginEnd: normalize(18)}}>
                <Icon name="question" size={normalize(20)} />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flex: 0.13,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignContent: 'center',
            }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.onLogoutPress();
              }}>
              <Text style={{color: 'red', fontSize: normalize(17)}}>
                Log Out
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
