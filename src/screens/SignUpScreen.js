import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator
} from 'react-native';

import Icon from 'react-native-ionicons';
import * as Animatable from 'react-native-animatable';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Snackbar from 'react-native-snackbar';

import Info from '../components/specs/Info';
import Identification from '../components/specs/Identification';

import {firebase} from '../../config/config';
import {normalize} from '../helpers/FontHelper';
import colors from '../assets/colors';

export default function SignUpScreen({navigation}) {
  const [fullName, setFullName] = useState('');
  const [isFullNameError, setIsFullNameError] = useState(false);
  const [fullNameErrorText, setFullNameErrorText] = useState('');

  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [emailErrorText, setEmailErrorText] = useState('');

  const [password, setPassword] = useState('');
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [passwordErrorText, setPasswordErrorText] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [isConfirmPasswordError, setIsConfirmPasswordError] = useState(false);
  const [confirmPasswordErrorText, setConfirmPasswordErrorText] = useState('');

  const [imageUri, setImageUri] = useState(
    'https://firebasestorage.googleapis.com/v0/b/patientmedicalrecords-788c5.appspot.com/o/Profile%20Pictures%2Fperson-icon.png?alt=media&token=06a6cd80-7d49-4127-92c5-ce843f6f8c3a',
  );

  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const validateInput = () => {
    if (fullName.length < 3) {
      setIsFullNameError(true);
      setFullNameErrorText('Name must be at least 3 characters');
      return false;
    }
    if (!isValidEmail) {
      setIsEmailError(true);
      setEmailErrorText('The email address is badly formatted');
      return false;
    }
    if (password.length === 0) {
      setIsPasswordError(true);
      setPasswordErrorText('Password field must not be left blank');
      return false;
    }
    if (password.length < 6) {
      setIsPasswordError(true);
      setPasswordErrorText('Password should be at least 6 characters');
      setIsConfirmPasswordError(true);
      setConfirmPasswordErrorText('Password should be at least 6 characters');
      return false;
    }
    if (password !== confirmPassword) {
      setIsConfirmPasswordError(true);
      setConfirmPasswordErrorText("Password don't match");
      return false;
    }
    if (confirmPassword.length === 0) {
      setIsConfirmPasswordError(true);
      setConfirmPasswordErrorText(
        'Password confirmation field must not be left blank',
      );
      return false;
    }
    return true;
  };

  const onSignUpPress = () => {
    setIsButtonLoading(true);
    if (!validateInput()) {
      setIsButtonLoading(false);
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        console.log(response);
        const uid = response.user.uid;
        const data = {
          id: uid,
          email,
          fullName,
          imageUri,
        };
        const usersRef = firebase.firestore().collection('users');
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            setIsButtonLoading(false);
            navigation.navigate('Home');
          })
          .catch((error) => {
            setIsButtonLoading(false);
            console.log(error);
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
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <Animatable.View style={styles.header} animation="fadeInUpBig">
            <Text style={styles.textHeader}>Join us</Text>
          </Animatable.View>
          <View style={styles.footer}>
            <ScrollView style={{flex: 1, paddingHorizontal: '8%'}}>
              <Identification imageUri={imageUri} setImageUri={setImageUri} />

              <Info
                fullName={fullName}
                setFullName={setFullName}
                isFullNameError={isFullNameError}
                setIsFullNameError={setIsFullNameError}
                fullNameErrorText={fullNameErrorText}
                setFullNameErrorText={setFullNameErrorText}
                email={email}
                setEmail={setEmail}
                isValidEmail={isValidEmail}
                setIsValidEmail={setIsValidEmail}
                isEmailError={isEmailError}
                setIsEmailError={setIsEmailError}
                emailErrorText={emailErrorText}
                setEmailErrorText={setEmailErrorText}
                password={password}
                setPassword={setPassword}
                isPasswordError={isPasswordError}
                setIsPasswordError={setIsPasswordError}
                passwordErrorText={passwordErrorText}
                setPasswordErrorText={setPasswordErrorText}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                isConfirmPasswordError={isConfirmPasswordError}
                setIsConfirmPasswordError={setIsConfirmPasswordError}
                confirmPasswordErrorText={confirmPasswordErrorText}
                setConfirmPasswordErrorText={setConfirmPasswordErrorText}
              />
            </ScrollView>
            <TouchableOpacity
              style={{
                alignItems: 'flex-end',
                marginTop: normalize(20),
                marginEnd: normalize(50),
              }}
              onPress={() => {
                onSignUpPress();
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
    backgroundColor: colors.primaryColor,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: '10%',
    paddingVertical: screenHeight * 0.08,
  },
  textHeader: {
    color: 'white',
    fontSize: normalize(42),
    fontWeight: 'bold',
  },
  footer: {
    flex: 1,
    height: screenHeight / 1.6,
    backgroundColor: 'white',
    borderRadius: 35,
    marginHorizontal: '4%',

    paddingVertical: '6.8%',
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
