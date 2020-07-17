import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import Icon from 'react-native-ionicons';

import * as Animatable from 'react-native-animatable';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Snackbar from 'react-native-snackbar';

import InputField from '../components/InputField';
import PwdField from '../components/PwdField';

import {firebase} from '../../config/config';
import firestore from '@react-native-firebase/firestore';
import {normalize} from '../helpers/FontHelper';
import colors from '../assets/colors';
import {userCache} from '../helpers/cacheHelper';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [emailErrorText, setEmailErrorText] = useState('');

  const [password, setPassword] = useState('');
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [passwordErrorText, setPasswordErrorText] = useState('');

  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const handleEmailTextInputChange = (text) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(text.toLowerCase())) {
      setIsValidEmail(true);
      setEmail(text);
    } else {
      setIsValidEmail(false);
    }
  };

  const onLoginPress = () => {
    setIsButtonLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const usersRef = firestore().collection('users');
        usersRef
          .doc(uid)
          .get()
          .then((firestoreDocument) => {
            if (!firestoreDocument.exists) {
              setIsEmailError(true);
              setEmailErrorText('User does not exist');
              setIsButtonLoading(false);
              return;
            }
            const user = firestoreDocument.data();
            setIsButtonLoading(false);
            signingIn(user);
            
          })
          .catch((error) => {
            setIsButtonLoading(false);
            Snackbar.show({
              text: 'Something went wrong',
              duration: Snackbar.LENGTH_INDEFINITE,
              action: {
                text: 'DETAILS',
                textColor: colors.primaryColor,
                onPress: () => {
                  alert(error.message);
                },
              },
            });
          });
      })
      .catch((error) => {
        setIsButtonLoading(false);
        if (
          error.code == 'auth/wrong-password' ||
          error.code == 'auth/invalid-password'
        ) {
          setPasswordErrorText(error.message);
          setIsPasswordError(true);
        }
        // long error messages
        else if (
          error.code == 'auth/invalid-credential' ||
          error.code == 'auth/insufficient-permission' ||
          error.code == 'auth/internal-error' ||
          error.code == 'auth/project-not-found' ||
          error.code == 'auth/reserved-claims'
        ) {
          Snackbar.show({
            text: 'Something went wrong',
            duration: Snackbar.LENGTH_INDEFINITE,
            action: {
              text: 'DETAILS',
              textColor: colors.primaryColor,
              onPress: () => {
                alert(error.message);
              },
            },
          });
        } else {
          setIsEmailError(true);
          setEmailErrorText(error.message);
        }
      });
  };

  const signingIn = async (data) => {
    const user = await firebase.auth().currentUser;
    console.log(user)
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <Animatable.View style={styles.header} animation="fadeInUpBig">
            <Text style={styles.textHeader}>Signing in</Text>
          </Animatable.View>
          <View style={styles.footer}>
            <InputField
              title="Email"
              iconName="mail"
              color={colors.primaryColor}
              placeHolder="Ex: physivoice@trash.grav"
              autoCapitalize="none"
              keyboardType="email-address"
              isErrorVisible={isEmailError}
              errorText={emailErrorText}
              onFocusCallback={() => {
                setEmailErrorText('');
                setIsEmailError(false);
              }}
              onInputChange={(text) => {
                handleEmailTextInputChange(text);
              }}>
              {isValidEmail ? (
                <Animatable.View animation="bounceIn">
                  <Icon
                    name="checkmark-circle"
                    color="green"
                    size={normalize(35)}
                    style={{marginTop: normalize(34)}}
                  />
                </Animatable.View>
              ) : null}
            </InputField>

            <PwdField
              color={colors.primaryColor}
              value={password}
              isErrorVisible={isPasswordError}
              errorText={passwordErrorText}
              onFocusCallback={() => {
                setPasswordErrorText('');
                setIsPasswordError(false);
              }}
              onInputChange={(text) => {
                setPassword(text);
              }}
            />

            <TouchableOpacity>
              <Text style={{color: '#009bd1', fontSize: normalize(23)}}>
                Forgot password ?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{alignItems: 'flex-end', marginTop: normalize(20)}}
              disabled={isButtonLoading}
              onPress={() => {
                onLoginPress();
              }}>
              <View style={styles.button}>
                {isButtonLoading ? (
                  <ActivityIndicator
                    animating={isButtonLoading}
                    color={'white'}
                  />
                ) : (
                  <Icon
                    name="arrow-forward"
                    color="white"
                    size={normalize(40)}
                  />
                )}
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
    backgroundColor: colors.secondaryColor,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: '10%',
    paddingVertical: screenHeight * 0.1,
  },
  footer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 35,
    marginHorizontal: '4%',
    paddingHorizontal: '5%',
    paddingVertical: '8.5%',
  },
  textHeader: {
    color: 'white',
    fontSize: normalize(42),
    fontWeight: 'bold',
  },
  absolute: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  box: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: '4%',
  },
  button: {
    width: screenWidth / 5,
    height: screenHeight / 20,
    backgroundColor: colors.secondaryColor,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
