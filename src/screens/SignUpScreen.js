import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'react-native';

import Icon from 'react-native-ionicons';

import * as Animatable from 'react-native-animatable';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import InputField from '../components/InputField';
import PwdField from '../components/PwdField';

import {firebase} from '../../config/config';
import {normalize} from '../helpers/FontHelper';
import colors from '../assets/colors';

export default function SignUpScreen({navigation}) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);

  const handleEmailTextInputChange = (text) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(text.toLowerCase())) {
      setIsValidEmail(true);
      setEmail(text);
    } else {
      setIsValidEmail(false);
      setEmail('');
    }
  };

  const validateInputFields = () => {
    
  }

  const onFooterLinkPress = () => {
    navigation.navigate('LoginScreen');
  };

  const onSignUpPress = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const data = {
          id: uid,
          email,
          fullName,
        };
        const usersRef = firebase.firestore().collection('users');
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            navigation.navigate('Home', {user: data});
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <Animatable.View style={styles.header} animation="fadeInUpBig">
            <Text style={styles.textHeader}>Join us</Text>
          </Animatable.View>
          <View style={styles.footer}>
            <InputField
              title="Full name"
              iconName="person"
              color={colors.secondaryColor}
              placeHolder="Ex: Jordan Peterson"
              autoCapitalize="sentences"
              keyboardType="default"
              onInputChange={(text) => {
                setFullName(text);
              }}>
              {fullName.length > 0 ? (
                <Animatable.View animation="bounceIn">
                  <Icon
                    name="checkmark-circle"
                    color="green"
                    size={normalize(20)}
                  />
                </Animatable.View>
              ) : null}
            </InputField>
            <InputField
              title="Email"
              iconName="mail"
              color={colors.secondaryColor}
              placeHolder="Ex: physivoice@trash.grav"
              autoCapitalize="none"
              keyboardType="email-address"
              onInputChange={(text) => {
                handleEmailTextInputChange(text);
              }}>
              {isValidEmail ? (
                <Animatable.View animation="bounceIn">
                  <Icon
                    name="checkmark-circle"
                    color="green"
                    size={normalize(20)}
                  />
                </Animatable.View>
              ) : null}
            </InputField>
            <PwdField
              color={colors.secondaryColor}
              value={password}
              onInputChange={(text) => {
                setPassword(text);
              }}
            />
            <PwdField
              title="Confirm password"
              color={colors.secondaryColor}
              value={confirmPassword}
              onInputChange={(text) => {
                setConfirmPassword(text);
              }}
            />
            <TouchableOpacity
              style={{alignItems: 'flex-end'}}
              onPress = {() => {validateInputFields}}>
              <View style={styles.button}>
                <Icon name="arrow-forward" color="white" size={normalize(25)} />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
    backgroundColor: colors.primaryColor,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: '10%',
    paddingVertical: screenHeight * 0.07,
  },
  textHeader: {
    color: 'white',
    fontSize: normalize(30),
    fontWeight: 'bold',
  },
  footer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 35,
    marginHorizontal: '4%',
    paddingHorizontal: '5%',
    paddingVertical: '8.5%',
  },
  button: {
    width: normalize(100),
    backgroundColor: colors.secondaryColor,
    marginTop: normalize(15),
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: normalize(15),
  },
});
